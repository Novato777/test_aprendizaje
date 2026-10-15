const fs = require('fs');
const path = require('path');
const { calculateResults } = require('./logic');

/**
 * File-backed storage to stay consistent across serverless/API requests on Vercel.
 * In local environments the store is kept under data/app-store.json.
 */

const STORE_PATH = process.env.VERCEL
  ? '/tmp/test_aprendizaje_store.json'
  : path.join(__dirname, '..', 'data', 'app-store.json');

function ensureStoreFile() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    const initialState = {
      nextSessionId: 1,
      nextStudentId: 1,
      sessions: [],
      students: []
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(initialState, null, 2));
  }
}

function readStore() {
  ensureStoreFile();
  const raw = fs.readFileSync(STORE_PATH, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (_error) {
    return {
      nextSessionId: 1,
      nextStudentId: 1,
      sessions: [],
      students: []
    };
  }
}

function writeStore(state) {
  ensureStoreFile();
  fs.writeFileSync(STORE_PATH, JSON.stringify(state, null, 2));
}

function createSession({ instructorName, programName, groupNumber }) {
  const store = readStore();
  const slug = `sess-${Math.random().toString(36).slice(2, 10)}`;
  const now = new Date().toISOString();

  const session = {
    id: store.nextSessionId++,
    slug,
    instructorName: instructorName.trim(),
    programName: programName.trim(),
    groupNumber: String(groupNumber).trim(),
    createdAt: now,
    isClosed: false
  };

  store.sessions.push(session);
  writeStore(store);
  return getSessionById(session.id);
}

function getSessionById(id) {
  const { sessions, students } = readStore();
  const session = sessions.find(s => s.id === Number(id));
  if (!session) return null;

  return {
    ...session,
    students: students
      .filter(s => s.sessionId === Number(session.id))
      .map(s => ({ ...s }))
  };
}

function getSessionBySlug(slug) {
  const { sessions, students } = readStore();
  const session = sessions.find(s => s.slug === slug);
  if (!session) return null;

  return {
    ...session,
    students: students
      .filter(s => s.sessionId === Number(session.id))
      .map(s => ({ ...s }))
  };
}

function listStudents(sessionId) {
  const { students } = readStore();
  return students
    .filter(s => s.sessionId === Number(sessionId))
    .map(s => ({ ...s }));
}

function createStudent({ sessionId, name }) {
  const store = readStore();
  const student = {
    id: store.nextStudentId++,
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

  store.students.push(student);
  writeStore(store);
  return {
    id: student.id,
    sessionId: student.sessionId,
    name: student.name,
    createdAt: student.createdAt,
    completed: false
  };
}

function getStudentById(studentId) {
  const { students } = readStore();
  const student = students.find(s => s.id === Number(studentId));
  if (!student) return null;
  return { ...student };
}

function submitStudentAnswers({ studentId, answers }) {
  const store = readStore();
  const index = store.students.findIndex(s => s.id === Number(studentId));
  if (index === -1) {
    throw new Error('No existe el estudiante.');
  }

  const result = calculateResults(answers);

  store.students[index] = {
    ...store.students[index],
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

  writeStore(store);
  return {
    ...result,
    studentId: Number(studentId),
    answers
  };
}

function closeSessionBySlug(slug) {
  const store = readStore();
  const session = store.sessions.find(s => s.slug === slug);
  if (!session) return false;
  session.isClosed = true;
  writeStore(store);
  return true;
}

function resetSessionBySlug(slug) {
  const store = readStore();
  const session = store.sessions.find(s => s.slug === slug);
  if (!session) return false;

  for (let i = store.students.length - 1; i >= 0; i--) {
    if (store.students[i].sessionId === session.id) {
      store.students.splice(i, 1);
    }
  }

  session.isClosed = false;
  writeStore(store);
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
