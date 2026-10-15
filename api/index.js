const {
  createSession,
  getSessionBySlug,
  getSessionById,
  createStudent,
  getStudentById,
  submitStudentAnswers,
  closeSessionBySlug,
  resetSessionBySlug,
  readStore,
  writeStore
} = require('../src/db');
const { QUESTIONS } = require('../src/questions');
const { generateSessionReportBuffer, generateSessionReport } = require('../src/pdfReport');

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function syncFromCloudStore() {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    const res = await fetch(`${KV_URL}/get/test_aprendizaje_store`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` }
    });
    if (!res.ok) return;
    const json = await res.json();
    if (!json || !json.result) return;
    const raw = typeof json.result === 'string' ? json.result : JSON.stringify(json.result);
    let parsed;
    try { parsed = JSON.parse(raw); } catch (_) { return; }
    if (parsed && Array.isArray(parsed.sessions)) {
      writeStore(parsed);
    }
  } catch (err) {
    console.warn('Advertencia al sincronizar desde Upstash/KV:', err.message);
  }
}

async function syncToCloudStore() {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    const store = readStore();
    // Store as a JSON string so it can be retrieved and parsed reliably
    const storeStr = JSON.stringify(store);
    await fetch(`${KV_URL}/set/test_aprendizaje_store`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(storeStr)
    });
  } catch (err) {
    console.warn('Advertencia al sincronizar hacia Upstash/KV:', err.message);
  }
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        resolve({});
      }
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        resolve({});
      }
    });
  });
}

function getPublicOrigin(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'localhost:3000';
  const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  const cleanHost = host.replace(/^https?:\/\//, '');
  return `${proto}://${cleanHost}`;
}

module.exports = async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  // Allow same-origin requests from the app (no login wall for students)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // Cloud KV sync if configured
  await syncFromCloudStore();

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'POST' && pathname === '/api/sessions') {
    const body = await readBody(req);
    const instructorName = normalizeText(body?.instructorName);
    const programName = normalizeText(body?.programName);
    const groupNumber = normalizeText(body?.groupNumber);

    if (!instructorName || !programName || !groupNumber) {
      return sendJson(res, 400, { error: 'Todos los campos del instructor son obligatorios y no pueden quedar vacíos.' });
    }

    const session = createSession({ instructorName, programName, groupNumber });
    const origin = getPublicOrigin(req);
    const shareUrl = `${origin}/s/${session.slug}`;

    await syncToCloudStore();

    return sendJson(res, 201, {
      ...session,
      shareUrl,
      status: session.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'GET' && /^\/api\/sessions\/.+/.test(pathname) && !pathname.endsWith('/report')) {
    const rawSlug = pathname.split('/').filter(Boolean)[2];
    const slug = rawSlug ? rawSlug.trim().replace(/\/+$/, '') : '';
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    const origin = getPublicOrigin(req);
    return sendJson(res, 200, {
      ...session,
      shareUrl: `${origin}/s/${session.slug}`,
      status: session.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'POST' && /^\/api\/sessions\/.+\/close$/.test(pathname)) {
    const rawSlug = pathname.split('/').filter(Boolean)[2];
    const slug = rawSlug ? rawSlug.trim().replace(/\/+$/, '') : '';
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    const closed = closeSessionBySlug(slug);
    if (!closed) {
      return sendJson(res, 400, { error: 'No se pudo cerrar la sesión.' });
    }

    await syncToCloudStore();

    const updated = getSessionBySlug(slug);
    return sendJson(res, 200, {
      ...updated,
      status: updated.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'POST' && /^\/api\/sessions\/.+\/reset$/.test(pathname)) {
    const rawSlug = pathname.split('/').filter(Boolean)[2];
    const slug = rawSlug ? rawSlug.trim().replace(/\/+$/, '') : '';
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    const reset = resetSessionBySlug(slug);
    if (!reset) {
      return sendJson(res, 400, { error: 'No se pudo reiniciar la sesión.' });
    }

    await syncToCloudStore();

    const updated = getSessionBySlug(slug);
    return sendJson(res, 200, {
      ...updated,
      status: updated.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'POST' && pathname === '/api/students') {
    const body = await readBody(req);
    const slug = normalizeText(body?.slug).replace(/\/+$/, '');
    const name = normalizeText(body?.name);

    if (!slug || !name) {
      return sendJson(res, 400, { error: 'Se requiere un slug de sesión válido y un nombre de estudiante no vacío.' });
    }

    const session = getSessionBySlug(slug);
    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    if (session.isClosed) {
      return sendJson(res, 403, { error: 'La encuesta ya está cerrada. No se aceptan nuevos registros.' });
    }

    const student = createStudent({ sessionId: session.id, name, slug: session.slug });
    await syncToCloudStore();

    return sendJson(res, 201, {
      student,
      session: {
        id: session.id,
        slug: session.slug,
        programName: session.programName,
        groupNumber: session.groupNumber,
        isClosed: session.isClosed
      }
    });
  }

  if (req.method === 'POST' && /^\/api\/students\/.+\/submit$/.test(pathname)) {
    const body = await readBody(req);
    const studentId = Number(pathname.split('/').filter(Boolean)[2]);
    const { answers, name, slug } = body || {};

    if (!Array.isArray(answers)) {
      return sendJson(res, 400, { error: 'Se requiere un arreglo de respuestas.' });
    }

    let student = getStudentById(studentId);
    const cleanSlug = slug ? String(slug).trim().replace(/\/+$/, '') : null;

    if (!student && name) {
      // Auto-heal student record if container was restarted
      const session = cleanSlug ? getSessionBySlug(cleanSlug) : null;
      if (session) {
        student = createStudent({ sessionId: session.id, name: String(name).trim(), slug: session.slug });
      }
    }

    if (!student) {
      return sendJson(res, 404, { error: 'El estudiante no existe.' });
    }

    const session = getSessionById(student.sessionId) || (cleanSlug ? getSessionBySlug(cleanSlug) : null);
    if (!session) {
      return sendJson(res, 404, { error: 'La sesión del estudiante no existe.' });
    }

    if (session.isClosed) {
      return sendJson(res, 403, { error: 'La encuesta se cerró y ya no acepta envíos.' });
    }

    if (student.completed) {
      return sendJson(res, 409, { error: 'El estudiante ya envió el test.' });
    }

    if (answers.length !== QUESTIONS.length) {
      return sendJson(res, 400, {
        error: `Debes responder todas las ${QUESTIONS.length} preguntas antes de enviar.`
      });
    }

    try {
      const result = submitStudentAnswers({
        studentId: student.id,
        answers,
        studentName: student.name,
        slug: session.slug
      });
      await syncToCloudStore();

      return sendJson(res, 200, {
        message: 'Resultados enviados correctamente.',
        result,
        student: {
          id: student.id,
          name: student.name,
          completed: true
        }
      });
    } catch (error) {
      return sendJson(res, 400, { error: error.message || 'Error al procesar respuestas.' });
    }
  }

  if (req.method === 'GET' && /^\/api\/sessions\/.+\/report$/.test(pathname)) {
    const rawSlug = pathname.split('/').filter(Boolean)[2];
    const slug = rawSlug ? rawSlug.trim().replace(/\/+$/, '') : '';
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    const cleanInstructor = (session.instructorName || 'reporte').replace(/[^\w-]/g, '_');
    const cleanGroup = (session.groupNumber || '').replace(/[^\w-]/g, '_');
    const filename = `Reporte_VAK_${cleanInstructor}_${cleanGroup}.pdf`;
    const isPreview = url.searchParams.get('preview') === 'true' || url.searchParams.get('preview') === '1';

    try {
      const pdfBuffer = await generateSessionReportBuffer(session);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', pdfBuffer.length);
      const safeFilename = filename.replace(/[^\x20-\x7E]/g, '_');
      res.setHeader(
        'Content-Disposition',
        `${isPreview ? 'inline' : 'attachment'}; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
      );
      return res.end(pdfBuffer);
    } catch (error) {
      console.error('Error al generar PDF en /api/report:', error);
      return sendJson(res, 500, { error: 'No se pudo generar el documento PDF: ' + (error.message || 'error interno') });
    }
  }

  return sendJson(res, 404, { error: 'Ruta no encontrada.' });
};
