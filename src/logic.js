const { QUESTIONS } = require('./questions');

const QUESTION_MAP = [
  'BAC', 'ACB', 'BAC', 'CBA', 'CBA', 'BAC', 'ABC', 'BAC', 'ACB', 'CBA',
  'BAC', 'BCA', 'CAB', 'ABC', 'BAC', 'ACB', 'CBA', 'CAB', 'ABC', 'ACB',
  'BCA', 'CAB', 'ABC', 'BAC', 'ABC', 'CBA', 'BAC', 'CBA', 'BCA', 'CBA',
  'BAC', 'CAB', 'ACB', 'BAC', 'BCA', 'ACB', 'ABC', 'BCA', 'BCA', 'CAB'
];

const CATEGORY_ORDER = ['visual', 'auditory', 'kinesthetic'];
const CATEGORY_LABELS = {
  visual: 'Visual',
  auditory: 'Auditivo',
  kinesthetic: 'Cinestésico'
};

function normalizeQuestionNumber(questionNumber) {
  const value = Number(questionNumber);
  if (!Number.isInteger(value) || value < 1 || value > 40) {
    throw new Error('La pregunta debe estar entre 1 y 40.');
  }
  return value;
}

function mapSelectedOptionToCategory(questionPattern, selectedOption) {
  const normalizedOption = String(selectedOption || '').toUpperCase();
  if (!['A', 'B', 'C'].includes(normalizedOption)) {
    throw new Error(`La opción seleccionada ${selectedOption} no es válida.`);
  }

  const categoryByLetter = {
    visual: questionPattern[0],
    auditory: questionPattern[1],
    kinesthetic: questionPattern[2]
  };

  const match = Object.entries(categoryByLetter).find(([, letter]) => letter === normalizedOption);
  if (!match) {
    throw new Error(`No existe una categoría que coincida con la opción ${selectedOption}.`);
  }

  return match[0];
}

function calculateResults(answers) {
  const categoryScores = { visual: 0, auditory: 0, kinesthetic: 0 };

  if (!Array.isArray(answers) || answers.length !== 40) {
    throw new Error('Debe enviar exactamente 40 respuestas.');
  }

  const questionNumbers = new Set();

  for (const answer of answers) {
    const questionNumber = normalizeQuestionNumber(answer.questionNumber);
    if (questionNumbers.has(questionNumber)) {
      throw new Error(`La pregunta ${questionNumber} se respondió más de una vez.`);
    }
    questionNumbers.add(questionNumber);

    const pattern = QUESTION_MAP[questionNumber - 1];
    const category = mapSelectedOptionToCategory(pattern, answer.selectedOption);
    categoryScores[category] += 1;
  }

  const percentages = {};
  for (const key of CATEGORY_ORDER) {
    percentages[key] = Number(((categoryScores[key] / 40) * 100).toFixed(2));
  }

  const maxScore = Math.max(...CATEGORY_ORDER.map((key) => categoryScores[key]));
  const predominantStyles = CATEGORY_ORDER.filter((key) => categoryScores[key] === maxScore);

  return {
    visualPoints: categoryScores.visual,
    auditoryPoints: categoryScores.auditory,
    kinestheticPoints: categoryScores.kinesthetic,
    totalPoints: categoryScores.visual + categoryScores.auditory + categoryScores.kinesthetic,
    visualPct: percentages.visual,
    auditoryPct: percentages.auditory,
    kinestheticPct: percentages.kinesthetic,
    predominantStyles,
    predominantLabel: predominantStyles.map((key) => CATEGORY_LABELS[key]).join(', '),
    styles: CATEGORY_ORDER.map((key) => ({
      style: key,
      label: CATEGORY_LABELS[key],
      points: categoryScores[key],
      percentage: percentages[key]
    }))
  };
}

module.exports = {
  QUESTION_MAP,
  QUESTIONS,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  calculateResults
};
