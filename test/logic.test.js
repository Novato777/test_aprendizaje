const test = require('node:test');
const assert = require('node:assert/strict');

const handler = require('../api');
const { calculateResults, QUESTION_MAP } = require('../src/logic');

function createMockRequest(method, url, payload) {
  return {
    method,
    url,
    on(event, callback) {
      if (event === 'data') {
        setImmediate(() => callback(Buffer.from(JSON.stringify(payload || {}))));
      }
      if (event === 'end') {
        setImmediate(() => callback());
      }
    }
  };
}

function createMockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(payload) {
      this.body = payload || '';
    }
  };
}

test('la tabla de 40 preguntas mantiene el total de 40 puntos y los porcentajes suman 100%', () => {
  const answers = Array.from({ length: 40 }, (_, index) => {
    const questionNumber = index + 1;
    const pattern = QUESTION_MAP[index];
    return { questionNumber, selectedOption: pattern[0] };
  });

  const result = calculateResults(answers);

  assert.equal(result.totalPoints, 40);
  assert.equal(result.visualPct + result.auditoryPct + result.kinestheticPct, 100);
  assert.equal(result.visualPoints + result.auditoryPoints + result.kinestheticPoints, 40);
});

test('el cálculo de una respuesta con empate en predominio devuelve todos los estilos empatados', () => {
  const answers = Array.from({ length: 40 }, (_, index) => {
    const questionNumber = index + 1;
    const pattern = QUESTION_MAP[index];
    let selectedOption = pattern[0];

    if (index >= 14 && index < 28) {
      selectedOption = pattern[1];
    }
    if (index >= 28) {
      selectedOption = pattern[2];
    }

    return { questionNumber, selectedOption };
  });

  const result = calculateResults(answers);
  assert.deepEqual(result.predominantStyles, ['visual', 'auditory']);
});

test('POST /api/sessions rechaza campos vacíos o con sólo espacios', async () => {
  const req = createMockRequest('POST', '/api/sessions', {
    instructorName: '   ',
    programName: '   ',
    groupNumber: '   '
  });
  const res = createMockResponse();

  await handler(req, res);

  assert.equal(res.statusCode, 400);
  const payload = JSON.parse(res.body);
  assert.match(payload.error, /obligatorios|vacios|espacios/i);
});

test('POST /api/students rechaza nombres vacíos o con sólo espacios', async () => {
  const session = {
    id: 1,
    slug: 'sess-test',
    instructorName: 'Ana',
    programName: 'Matemáticas',
    groupNumber: 'A1',
    isClosed: false,
    students: []
  };

  const storePath = require('path').join(__dirname, '..', 'data', 'app-store.json');
  const fs = require('fs');
  const dir = require('path').dirname(storePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const existing = fs.existsSync(storePath) ? JSON.parse(fs.readFileSync(storePath, 'utf8')) : { sessions: [], students: [] };
  existing.sessions = [session];
  existing.students = [];
  fs.writeFileSync(storePath, JSON.stringify(existing, null, 2));

  const req = createMockRequest('POST', '/api/students', {
    slug: 'sess-test',
    name: '   '
  });
  const res = createMockResponse();

  await handler(req, res);

  assert.equal(res.statusCode, 400);
  const payload = JSON.parse(res.body);
  assert.match(payload.error, /nombre|obligatorio|vacio|espacios/i);
});

test('getSessionBySlug auto-recupera la sesión si el store está vacío en serverless (auto-healing)', () => {
  const { createSession, getSessionBySlug } = require('../src/db');
  const session = createSession({
    instructorName: 'Prof. Laura',
    programName: 'Diseño Gráfico',
    groupNumber: 'D1'
  });

  assert.ok(session.slug.startsWith('sess-'));

  // Simulate wiped store / fresh serverless instance
  const storePath = require('path').join(__dirname, '..', 'data', 'app-store.json');
  const fs = require('fs');
  fs.writeFileSync(storePath, JSON.stringify({ nextSessionId: 100, nextStudentId: 100, sessions: [], students: [] }, null, 2));

  // getSessionBySlug should self-heal and recover the session
  const recovered = getSessionBySlug(session.slug);
  assert.ok(recovered, 'La sesión debe ser auto-recuperada sin error 404');
  assert.equal(recovered.instructorName, 'Prof. Laura');
  assert.equal(recovered.programName, 'Diseño Gráfico');
  assert.equal(recovered.groupNumber, 'D1');
});

