const { calculateResults } = require('./logic');

/**
 * Pure JavaScript In-Memory Store
 * Fully compatible with Vercel Serverless Functions, Node.js, and Vite.
 * Zero native binary dependencies, zero disk footprint, zero database management.
 */

let nextSessionId = 1;
let nextStudentId = 1;

const sessions = [];
const students = [];

function createSession({ instructorName, programName, groupNumber }) {
  const slug = `sess-${Math.random().toString(36).slice(2, 10)}`;
  const now = new Date().toISOString();

  const session = {
    id: nextSessionId++,
    slug,
    instructorName: instructorName.trim(),
    programName: programName.trim(),
    groupNumber: String(groupNumber).trim(),
    createdAt: now,
    isClosed: false
  };

  sessions.push(session);
  return getSessionById(session.id);
}

function getSessionById(id) {
  const session = sessions.find(s => s.id === Number(id));
  if (!session) return null;

  return {
    ...session,
    students: listStudents(session.id)
  };
}

function getSessionBySlug(slug) {
  const session = sessions.find(s => s.slug === slug);
  if (!session) return null;

  return {
    ...session,
    students: listStudents(session.id)
  };
}

function listStudents(sessionId) {
  return students
    .filter(s => s.sessionId === Number(sessionId))
    .map(s => ({ ...s }));
}

function createStudent({ sessionId, name }) {
  const student = {
    id: nextStudentId++,
    sessionId: Number(sessionId),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    completed: false,
    visualPoints: 0,
    auditoryPoints: 0,
    kinestheticPoints: 0,
    visualPct: 0,
    auditoryPct: 0,
    kinestheticPct: 0,
    predominantStyles: [],
    answersJson: null
  };

  students.push(student);
  return {
    id: student.id,
    sessionId: student.sessionId,
    name: student.name,
    createdAt: student.createdAt,
    completed: false
  };
}

function getStudentById(studentId) {
  const student = students.find(s => s.id === Number(studentId));
  if (!student) return null;
  return { ...student };
}

function submitStudentAnswers({ studentId, answers }) {
  const index = students.findIndex(s => s.id === Number(studentId));
  if (index === -1) {
    throw new Error('No existe el estudiante.');
  }

  const result = calculateResults(answers);

  students[index] = {
    ...students[index],
    answersJson: JSON.stringify(answers),
    completed: true,
    visualPoints: result.visualPoints,
    auditoryPoints: result.auditoryPoints,
    kinestheticPoints: result.kinestheticPoints,
    visualPct: result.visualPct,
    auditoryPct: result.auditoryPct,
    kinestheticPct: result.kinestheticPct,
    predominantStyles: result.predominantStyles
  };

  return {
    ...result,
    studentId: Number(studentId),
    answers
  };
}

function closeSessionBySlug(slug) {
  const session = sessions.find(s => s.slug === slug);
  if (!session) return false;
  session.isClosed = true;
  return true;
}

function resetSessionBySlug(slug) {
  const session = sessions.find(s => s.slug === slug);
  if (!session) return false;

  // Remove students for this session
  for (let i = students.length - 1; i >= 0; i--) {
    if (students[i].sessionId === session.id) {
      students.splice(i, 1);
    }
  }

  session.isClosed = false;
  return true;
}

module.exports = {
  createSession,
  getSessionBySlug,
  getSessionById,
  createStudent,
  getStudentById,
  submitStudentAnswers,
  closeSessionBySlug,
  resetSessionBySlug,
  listStudents
};
