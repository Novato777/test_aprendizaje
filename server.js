const express = require('express');
const path = require('path');
const {
  createSession,
  getSessionBySlug,
  getSessionById,
  createStudent,
  getStudentById,
  submitStudentAnswers,
  closeSessionBySlug,
  resetSessionBySlug,
  listStudents
} = require('./src/db');
const { QUESTIONS } = require('./src/questions');
const { generateSessionReport, generateSessionReportBuffer } = require('./src/pdfReport');

const app = express();
const PORT = process.env.PORT || 3000;

function getBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.get('host') || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/favicon.ico', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.svg'));
});

app.post('/api/sessions', (req, res) => {
  const { instructorName, programName, groupNumber } = req.body || {};

  if (!instructorName || !programName || !groupNumber) {
    return res.status(400).json({ error: 'Todos los campos del instructor son obligatorios.' });
  }

  const session = createSession({ instructorName, programName, groupNumber });
  const shareUrl = `${getBaseUrl(req)}/s/${session.slug}`;

  return res.status(201).json({
    ...session,
    shareUrl,
    status: session.isClosed ? 'Cerrada' : 'Activa'
  });
});

app.get('/api/sessions/:slug', (req, res) => {
  const session = getSessionBySlug(req.params.slug);
  if (!session) {
    return res.status(404).json({ error: 'La sesión no existe.' });
  }

  return res.json({
    ...session,
    shareUrl: `${getBaseUrl(req)}/s/${session.slug}`,
    status: session.isClosed ? 'Cerrada' : 'Activa'
  });
});

app.post('/api/sessions/:slug/close', (req, res) => {
  const session = getSessionBySlug(req.params.slug);
  if (!session) {
    return res.status(404).json({ error: 'La sesión no existe.' });
  }

  const closed = closeSessionBySlug(req.params.slug);
  if (!closed) {
    return res.status(400).json({ error: 'No se pudo cerrar la sesión.' });
  }

  const updated = getSessionBySlug(req.params.slug);
  return res.json({
    ...updated,
    status: updated.isClosed ? 'Cerrada' : 'Activa'
  });
});

app.post('/api/sessions/:slug/reset', (req, res) => {
  const session = getSessionBySlug(req.params.slug);
  if (!session) {
    return res.status(404).json({ error: 'La sesión no existe.' });
  }

  const reset = resetSessionBySlug(req.params.slug);
  if (!reset) {
    return res.status(400).json({ error: 'No se pudo reiniciar la sesión.' });
  }

  const updated = getSessionBySlug(req.params.slug);
  return res.json({
    ...updated,
    status: updated.isClosed ? 'Cerrada' : 'Activa'
  });
});

app.post('/api/students', (req, res) => {
  const { slug, name } = req.body || {};
  if (!slug || !name) {
    return res.status(400).json({ error: 'Se requiere el slug de la sesión y el nombre del estudiante.' });
  }

  const session = getSessionBySlug(slug);
  if (!session) {
    return res.status(404).json({ error: 'La sesión no existe.' });
  }

  if (session.isClosed) {
    return res.status(403).json({ error: 'La encuesta ya está cerrada. No se aceptan nuevos registros.' });
  }

  const student = createStudent({ sessionId: session.id, name, slug: session.slug });
  return res.status(201).json({
    student,
    session: {
      id: session.id,
      slug: session.slug,
      programName: session.programName,
      groupNumber: session.groupNumber,
      isClosed: session.isClosed
    }
  });
});

app.post('/api/students/:id/submit', (req, res) => {
  const studentId = Number(req.params.id);
  const { answers } = req.body || {};

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: 'Se requiere un arreglo de respuestas.' });
  }

  const student = getStudentById(studentId);
  if (!student) {
    return res.status(404).json({ error: 'El estudiante no existe.' });
  }

  const session = getSessionById(student.sessionId);
  if (!session) {
    return res.status(404).json({ error: 'La sesión del estudiante no existe.' });
  }

  if (session.isClosed) {
    return res.status(403).json({ error: 'La encuesta se cerró y ya no acepta envíos.' });
  }

  if (student.completed) {
    return res.status(409).json({ error: 'El estudiante ya envió el test.' });
  }

  if (answers.length !== QUESTIONS.length) {
    return res.status(400).json({
      error: `Debes responder todas las ${QUESTIONS.length} preguntas antes de enviar.`
    });
  }

  try {
    const { name, slug } = req.body || {};
    const result = submitStudentAnswers({
      studentId,
      answers,
      studentName: name || student.name,
      slug: slug || session.slug
    });
    return res.json({
      message: 'Resultados enviados correctamente.',
      result,
      student: {
        id: student.id,
        name: student.name,
        completed: true
      }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Error al procesar respuestas.' });
  }
});

app.get('/api/sessions/:slug/report', async (req, res) => {
  const session = getSessionBySlug(req.params.slug);
  if (!session) {
    return res.status(404).json({ error: 'La sesión no existe.' });
  }

  const isPreview = req.query.preview === '1' || req.query.preview === 'true';
  const cleanInstructor = (session.instructorName || 'reporte').replace(/[^\w-]/g, '_');
  const cleanGroup = (session.groupNumber || '').replace(/[^\w-]/g, '_');
  const filename = `Reporte_VAK_${cleanInstructor}_${cleanGroup}.pdf`;

  try {
    const pdfBuffer = await generateSessionReportBuffer(session);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader(
      'Content-Disposition',
      `${isPreview ? 'inline' : 'attachment'}; filename="${encodeURIComponent(filename)}"`
    );
    return res.end(pdfBuffer);
  } catch (err) {
    console.error('Error generando reporte PDF:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'No se pudo generar el documento PDF.' });
    }
  }
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/s/:slug', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'session.html'));
});

app.get('/panel/:slug', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'instructor.html'));
});

// 404 Fallback
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 500 Global Error Handler
app.use((err, _req, res, _next) => {
  console.error('Error no controlado:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
