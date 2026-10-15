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

function encodeSessionToSlug(instructorName, programName, groupNumber) {
  const payload = {
    i: instructorName.trim(),
    p: programName.trim(),
    g: String(groupNumber).trim(),
    t: Date.now()
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const rand = Math.random().toString(36).slice(2, 7);
  return `sess-${rand}_${encoded}`;
}

function decodeSessionFromSlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const clean = slug.trim().replace(/\/+$/, '');
  const parts = clean.split('_');
  if (parts.length < 2) return null;

  const encodedPart = parts.slice(1).join('_');
  try {
    const jsonStr = Buffer.from(encodedPart, 'base64url').toString('utf8');
    const data = JSON.parse(jsonStr);
    if (data && data.i && data.p && data.g) {
      return {
        instructorName: String(data.i).trim(),
        programName: String(data.p).trim(),
        groupNumber: String(data.g).trim(),
        createdAt: data.t ? new Date(data.t).toISOString() : new Date().toISOString()
      };
    }
  } catch (_) {
    return null;
  }
  return null;
}

function createSession({ instructorName, programName, groupNumber }) {
  const store = readStore();
  const slug = encodeSessionToSlug(instructorName, programName, groupNumber);
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
      .filter(s => s.sessionId === Number(session.id) || (session.slug && s.sessionSlug === session.slug))
      .map(s => ({ ...s }))
  };
}

function getSessionBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).trim().replace(/\/+$/, '');
  const store = readStore();
  let session = store.sessions.find(s => s.slug === cleanSlug);

  // Self-healing: if session is not in store (e.g. cold start / new serverless instance in Vercel)
  if (!session) {
    const recovered = decodeSessionFromSlug(cleanSlug);
    if (recovered) {
      session = {
        id: store.nextSessionId++,
        slug: cleanSlug,
        instructorName: recovered.instructorName,
        programName: recovered.programName,
        groupNumber: recovered.groupNumber,
        createdAt: recovered.createdAt || new Date().toISOString(),
        isClosed: false
      };
      store.sessions.push(session);
      writeStore(store);
    }
  }

  if (!session) return null;

  return {
    ...session,
    students: store.students
      .filter(s => s.sessionId === Number(session.id) || s.sessionSlug === cleanSlug)
      .map(s => ({ ...s }))
  };
}

function listStudents(sessionId) {
  const { students } = readStore();
  return students
    .filter(s => s.sessionId === Number(sessionId))
    .map(s => ({ ...s }));
}

function createStudent({ sessionId, name, slug }) {
  const store = readStore();
  const student = {
    id: store.nextStudentId++,
    sessionId: Number(sessionId),
    sessionSlug: slug ? String(slug).trim().replace(/\/+$/, '') : null,
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
    sessionSlug: student.sessionSlug,
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

function submitStudentAnswers({ studentId, answers, studentName, slug }) {
  const store = readStore();
  let index = store.students.findIndex(s => s.id === Number(studentId));
  const cleanSlug = slug ? String(slug).trim().replace(/\/+$/, '') : null;

  if (index === -1 && studentName) {
    // Auto-heal student record if container was restarted
    const session = cleanSlug ? getSessionBySlug(cleanSlug) : null;
    const newStudent = {
      id: Number(studentId),
      sessionId: session ? session.id : 1,
      sessionSlug: cleanSlug,
      name: String(studentName).trim(),
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
    store.students.push(newStudent);
    index = store.students.length - 1;
  }

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
  const cleanSlug = String(slug || '').trim().replace(/\/+$/, '');
  const store = readStore();
  let session = store.sessions.find(s => s.slug === cleanSlug);

  if (!session) {
    const recovered = decodeSessionFromSlug(cleanSlug);
    if (recovered) {
      session = {
        id: store.nextSessionId++,
        slug: cleanSlug,
        instructorName: recovered.instructorName,
        programName: recovered.programName,
        groupNumber: recovered.groupNumber,
        createdAt: recovered.createdAt || new Date().toISOString(),
        isClosed: true
      };
      store.sessions.push(session);
      writeStore(store);
      return true;
    }
    return false;
  }

  session.isClosed = true;
  writeStore(store);
  return true;
}

function resetSessionBySlug(slug) {
  const cleanSlug = String(slug || '').trim().replace(/\/+$/, '');
  const store = readStore();
  let session = store.sessions.find(s => s.slug === cleanSlug);

  if (!session) {
    const recovered = decodeSessionFromSlug(cleanSlug);
    if (recovered) {
      session = {
        id: store.nextSessionId++,
        slug: cleanSlug,
        instructorName: recovered.instructorName,
        programName: recovered.programName,
        groupNumber: recovered.groupNumber,
        createdAt: recovered.createdAt || new Date().toISOString(),
        isClosed: false
      };
      store.sessions.push(session);
      writeStore(store);
      return true;
    }
    return false;
  }

  for (let i = store.students.length - 1; i >= 0; i--) {
    if (store.students[i].sessionId === session.id || store.students[i].sessionSlug === cleanSlug) {
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
  listStudents,
  encodeSessionToSlug,
  decodeSessionFromSlug,
  readStore,
  writeStore
};
