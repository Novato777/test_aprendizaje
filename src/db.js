const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { calculateResults } = require('./logic');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const isMemory = process.env.PERSIST_DB !== 'true';
const dbPath = isMemory ? ':memory:' : path.join(dataDir, 'app.db');
const db = new Database(dbPath);
if (!isMemory) {
  db.pragma('journal_mode = WAL');
}

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    instructor_name TEXT NOT NULL,
    program_name TEXT NOT NULL,
    group_number TEXT NOT NULL,
    created_at TEXT NOT NULL,
    is_closed INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    answers_json TEXT,
    created_at TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    visual_points INTEGER NOT NULL DEFAULT 0,
    auditory_points INTEGER NOT NULL DEFAULT 0,
    kinesthetic_points INTEGER NOT NULL DEFAULT 0,
    visual_pct REAL NOT NULL DEFAULT 0,
    auditory_pct REAL NOT NULL DEFAULT 0,
    kinesthetic_pct REAL NOT NULL DEFAULT 0,
    predominant_styles TEXT NOT NULL DEFAULT '[]',
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
  );
`;

db.exec(SCHEMA);

function createSession({ instructorName, programName, groupNumber }) {
  const slug = `sess-${Math.random().toString(36).slice(2, 10)}`;
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO sessions (slug, instructor_name, program_name, group_number, created_at, is_closed)
    VALUES (?, ?, ?, ?, ?, 0)
  `);
  const result = stmt.run(slug, instructorName.trim(), programName.trim(), String(groupNumber).trim(), now);

  return getSessionById(result.lastInsertRowid);
}

function getSessionById(id) {
  const row = db.prepare(`
    SELECT id, slug, instructor_name AS instructorName, program_name AS programName, group_number AS groupNumber,
           created_at AS createdAt, is_closed AS isClosed
    FROM sessions WHERE id = ?
  `).get(id);

  if (!row) return null;
  return {
    ...row,
    isClosed: Boolean(row.isClosed),
    students: listStudents(row.id)
  };
}

function getSessionBySlug(slug) {
  const row = db.prepare(`
    SELECT id, slug, instructor_name AS instructorName, program_name AS programName, group_number AS groupNumber,
           created_at AS createdAt, is_closed AS isClosed
    FROM sessions WHERE slug = ?
  `).get(slug);

  if (!row) return null;
  return {
    ...row,
    isClosed: Boolean(row.isClosed),
    students: listStudents(row.id)
  };
}

function listStudents(sessionId) {
  const rows = db.prepare(`
    SELECT id, session_id AS sessionId, name, answers_json AS answersJson, created_at AS createdAt,
           completed, visual_points AS visualPoints, auditory_points AS auditoryPoints,
           kinesthetic_points AS kinestheticPoints, visual_pct AS visualPct,
           auditory_pct AS auditoryPct, kinesthetic_pct AS kinestheticPct,
           predominant_styles AS predominantStyles
    FROM students WHERE session_id = ? ORDER BY created_at ASC
  `).all(sessionId);

  return rows.map((row) => ({
    ...row,
    completed: Boolean(row.completed),
    predominantStyles: JSON.parse(row.predominantStyles || '[]')
  }));
}

function createStudent({ sessionId, name }) {
  const row = db.prepare(`
    INSERT INTO students (session_id, name, created_at, completed)
    VALUES (?, ?, ?, 0)
  `).run(sessionId, name.trim(), new Date().toISOString());

  return db.prepare(`
    SELECT id, session_id AS sessionId, name, created_at AS createdAt, completed
    FROM students WHERE id = ?
  `).get(row.lastInsertRowid);
}

function getStudentById(studentId) {
  return db.prepare(`
    SELECT id, session_id AS sessionId, name, answers_json AS answersJson, created_at AS createdAt,
           completed, visual_points AS visualPoints, auditory_points AS auditoryPoints,
           kinesthetic_points AS kinestheticPoints, visual_pct AS visualPct,
           auditory_pct AS auditoryPct, kinesthetic_pct AS kinestheticPct,
           predominant_styles AS predominantStyles
    FROM students WHERE id = ?
  `).get(studentId);
}

function submitStudentAnswers({ studentId, answers }) {
  const student = getStudentById(studentId);
  if (!student) {
    throw new Error('No existe el estudiante.');
  }

  const result = calculateResults(answers);
  const predominantStyles = JSON.stringify(result.predominantStyles);

  db.prepare(`
    UPDATE students
    SET answers_json = ?, completed = 1,
        visual_points = ?, auditory_points = ?, kinesthetic_points = ?,
        visual_pct = ?, auditory_pct = ?, kinesthetic_pct = ?,
        predominant_styles = ?
    WHERE id = ?
  `).run(
    JSON.stringify(answers),
    result.visualPoints,
    result.auditoryPoints,
    result.kinestheticPoints,
    result.visualPct,
    result.auditoryPct,
    result.kinestheticPct,
    predominantStyles,
    studentId
  );

  return {
    ...result,
    studentId,
    answers
  };
}

function closeSessionBySlug(slug) {
  const result = db.prepare(`UPDATE sessions SET is_closed = 1 WHERE slug = ?`).run(slug);
  return result.changes > 0;
}

function resetSessionBySlug(slug) {
  const session = getSessionBySlug(slug);
  if (!session) return false;
  db.prepare(`DELETE FROM students WHERE session_id = ?`).run(session.id);
  db.prepare(`UPDATE sessions SET is_closed = 0 WHERE id = ?`).run(session.id);
  return true;
}

module.exports = {
  db,
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
