const test = require('node:test');
const assert = require('node:assert/strict');

const { calculateResults, QUESTION_MAP } = require('../src/logic');

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
