const test = require('node:test');
const assert = require('node:assert/strict');
const { Writable } = require('node:stream');
const { calculateGroupStats, formatPredominantLabel, generateSessionReport, generateSessionReportBuffer } = require('../src/pdfReport');

test('calculateGroupStats calcula promedios y estilos correctamente con datos vacíos', () => {
  const stats = calculateGroupStats([]);
  assert.equal(stats.total, 0);
  assert.equal(stats.completedCount, 0);
  assert.equal(stats.completionRate, 0);
  assert.equal(stats.avgVisual, 0);
});

test('calculateGroupStats calcula estadísticas grupales precisas para estudiantes completados', () => {
  const students = [
    { completed: true, visualPct: 40, auditoryPct: 30, kinestheticPct: 30, predominantStyles: ['visual'] },
    { completed: true, visualPct: 20, auditoryPct: 50, kinestheticPct: 30, predominantStyles: ['auditory'] },
    { completed: false, visualPct: 0, auditoryPct: 0, kinestheticPct: 0, predominantStyles: [] }
  ];

  const stats = calculateGroupStats(students);
  assert.equal(stats.total, 3);
  assert.equal(stats.completedCount, 2);
  assert.equal(stats.completionRate, 67);
  assert.equal(stats.avgVisual, 30);
  assert.equal(stats.avgAuditory, 40);
  assert.equal(stats.avgKinesthetic, 30);
});

test('formatPredominantLabel traduce correctamente los estilos al español', () => {
  assert.equal(formatPredominantLabel(['visual']), 'Visual');
  assert.equal(formatPredominantLabel(['auditory']), 'Auditivo');
  assert.equal(formatPredominantLabel(['kinesthetic']), 'Cinestésico');
  assert.equal(formatPredominantLabel(['visual', 'auditory']), 'Visual / Auditivo');
  assert.equal(formatPredominantLabel([]), 'Sin resultado');
  assert.equal(formatPredominantLabel(null), 'Sin resultado');
});

test('generateSessionReport genera un flujo PDF válido sin errores', async () => {
  const mockSession = {
    instructorName: 'Prof. Ana Gómez',
    programName: 'Tecnología en Desarrollo de Software',
    groupNumber: 'Ficha 102',
    isClosed: true,
    students: [
      {
        id: 1,
        name: 'Carlos Ruiz',
        completed: true,
        visualPct: 45.0,
        auditoryPct: 35.0,
        kinestheticPct: 20.0,
        predominantStyles: ['visual']
      }
    ]
  };

  const chunks = [];
  const writableStream = new Writable({
    write(chunk, _encoding, callback) {
      chunks.push(chunk);
      callback();
    }
  });

  await new Promise((resolve, reject) => {
    writableStream.on('finish', resolve);
    writableStream.on('error', reject);
    generateSessionReport(mockSession, writableStream);
  });

  const buffer = Buffer.concat(chunks);
  // Verify PDF header magic bytes %PDF-
  assert.ok(buffer.length > 500, 'El PDF debe tener un tamaño razonable');
  assert.equal(buffer.subarray(0, 4).toString(), '%PDF');
});

test('generateSessionReportBuffer genera un Buffer con encabezado %PDF-', async () => {
  const mockSession = {
    instructorName: 'Prof. Carlos',
    programName: 'Biología',
    groupNumber: 'Grupo 10',
    isClosed: false,
    students: []
  };

  const buffer = await generateSessionReportBuffer(mockSession);
  assert.ok(Buffer.isBuffer(buffer), 'Debe ser un Buffer');
  assert.ok(buffer.length > 500, 'El buffer debe contener el PDF');
  assert.equal(buffer.subarray(0, 4).toString(), '%PDF');
});

