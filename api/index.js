const {
  createSession,
  getSessionBySlug,
  getSessionById,
  createStudent,
  getStudentById,
  submitStudentAnswers,
  closeSessionBySlug,
  resetSessionBySlug,
} = require('../src/db');
const { QUESTIONS } = require('../src/questions');
const { generateSessionReport } = require('../src/pdfReport');

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
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

module.exports = async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'POST' && pathname === '/api/sessions') {
    const body = await readBody(req);
    const { instructorName, programName, groupNumber } = body || {};

    if (!instructorName || !programName || !groupNumber) {
      return sendJson(res, 400, { error: 'Todos los campos del instructor son obligatorios.' });
    }

    const session = createSession({ instructorName, programName, groupNumber });
    const shareUrl = `${process.env.VERCEL_URL ? 'https' : 'http'}://${process.env.VERCEL_URL || 'localhost:3000'}/s/${session.slug}`;

    return sendJson(res, 201, {
      ...session,
      shareUrl,
      status: session.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'GET' && /^\/api\/sessions\/.+/.test(pathname) && !pathname.endsWith('/report')) {
    const slug = pathname.split('/').filter(Boolean)[2];
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    return sendJson(res, 200, {
      ...session,
      shareUrl: `${process.env.VERCEL_URL ? 'https' : 'http'}://${process.env.VERCEL_URL || 'localhost:3000'}/s/${session.slug}`,
      status: session.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'POST' && /^\/api\/sessions\/.+\/close$/.test(pathname)) {
    const slug = pathname.split('/').filter(Boolean)[2];
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    const closed = closeSessionBySlug(slug);
    if (!closed) {
      return sendJson(res, 400, { error: 'No se pudo cerrar la sesión.' });
    }

    const updated = getSessionBySlug(slug);
    return sendJson(res, 200, {
      ...updated,
      status: updated.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'POST' && /^\/api\/sessions\/.+\/reset$/.test(pathname)) {
    const slug = pathname.split('/').filter(Boolean)[2];
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    const reset = resetSessionBySlug(slug);
    if (!reset) {
      return sendJson(res, 400, { error: 'No se pudo reiniciar la sesión.' });
    }

    const updated = getSessionBySlug(slug);
    return sendJson(res, 200, {
      ...updated,
      status: updated.isClosed ? 'Cerrada' : 'Activa'
    });
  }

  if (req.method === 'POST' && pathname === '/api/students') {
    const body = await readBody(req);
    const { slug, name } = body || {};

    if (!slug || !name) {
      return sendJson(res, 400, { error: 'Se requiere el slug de la sesión y el nombre del estudiante.' });
    }

    const session = getSessionBySlug(slug);
    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    if (session.isClosed) {
      return sendJson(res, 403, { error: 'La encuesta ya está cerrada. No se aceptan nuevos registros.' });
    }

    const student = createStudent({ sessionId: session.id, name });
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
    const { answers } = body || {};

    if (!Array.isArray(answers)) {
      return sendJson(res, 400, { error: 'Se requiere un arreglo de respuestas.' });
    }

    const student = getStudentById(studentId);
    if (!student) {
      return sendJson(res, 404, { error: 'El estudiante no existe.' });
    }

    const session = getSessionById(student.sessionId);
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
      const result = submitStudentAnswers({ studentId, answers });
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
    const slug = pathname.split('/').filter(Boolean)[2];
    const session = getSessionBySlug(slug);

    if (!session) {
      return sendJson(res, 404, { error: 'La sesión no existe.' });
    }

    const cleanInstructor = (session.instructorName || 'reporte').replace(/[^\w-]/g, '_');
    const cleanGroup = (session.groupNumber || '').replace(/[^\w-]/g, '_');
    const filename = `Reporte_VAK_${cleanInstructor}_${cleanGroup}.pdf`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    try {
      return generateSessionReport(session, res);
    } catch (error) {
      return sendJson(res, 500, { error: 'No se pudo generar el documento PDF.' });
    }
  }

  return sendJson(res, 404, { error: 'Ruta no encontrada.' });
};
