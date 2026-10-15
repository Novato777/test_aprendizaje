const QUESTIONS = [
  { number: 1, prompt: 'Cuando quiero recordar información nueva, me resulta más fácil:', options: { A: 'Escuchar la explicación del tema.', B: 'Ver un esquema o una imagen del tema.', C: 'Aplicarlo de inmediato en una práctica.' } },
  { number: 2, prompt: 'Si voy a aprender a usar una herramienta nueva, primero:', options: { A: 'Leo el manual o miro una demostración visual.', B: 'Escucho la explicación de alguien.', C: 'La pruebo yo mismo para entenderla.' } },
  { number: 3, prompt: 'Cuando necesito estudiar para un examen, prefiero:', options: { A: 'Repasar con alguien que me explique.', B: 'Consultar diagramas, mapas o apuntes visuales.', C: 'Hacer ejercicios y practicar.' } },
  { number: 4, prompt: 'En una clase, me concentro mejor cuando:', options: { A: 'Puedo moverme o participar activamente.', B: 'Escucho atentamente la explicación.', C: 'Veo ejemplos visuales en la pizarra o pantalla.' } },
  { number: 5, prompt: 'Para comprender un concepto difícil, me ayuda más:', options: { A: 'Probarlo con un ejercicio práctico.', B: 'Escuchar la explicación con calma.', C: 'Mirar gráficos o representaciones visuales.' } },
  { number: 6, prompt: 'Cuando alguien explica algo, yo suelo recordar mejor:', options: { A: 'Lo que escucho con atención.', B: 'Las palabras y ejemplos que veo.', C: 'La experiencia o la acción que se realiza.' } },
  { number: 7, prompt: 'Si quiero aprender una canción nueva, prefiero:', options: { A: 'Escucharla varias veces.', B: 'Ver la partitura o una representación visual.', C: 'Cantarla o repetirla con movimiento.' } },
  { number: 8, prompt: 'Me siento más motivado cuando:', options: { A: 'Puedo discutir y escuchar a otros.', B: 'Veo un ejemplo claro o un video.', C: 'Participo haciendo algo con mis manos.' } },
  { number: 9, prompt: 'Cuando me explican un procedimiento, prefiero:', options: { A: 'Seguir el paso a paso con acciones concretas.', B: 'Escuchar la explicación verbal.', C: 'Ver una imagen o esquema del procedimiento.' } },
  { number: 10, prompt: 'Para recordar información, me sirve más:', options: { A: 'Asociarla con una imagen o color.', B: 'Repetirla en voz alta o explicársela a otra persona.', C: 'Relacionarla con una experiencia física y práctica.' } },
  { number: 11, prompt: 'Al resolver un problema, normalmente:', options: { A: 'Lo analizo con una explicación verbal.', B: 'Lo visualizo con un esquema o dibujo.', C: 'Lo pruebo directamente y ajusto el proceso.' } },
  { number: 12, prompt: 'Cuando me enseñan algo nuevo, me gusta:', options: { A: 'Ver cómo lo hacen en una demostración.', B: 'Escuchar la explicación detenidamente.', C: 'Ponerlo en práctica yo mismo.' } },
  { number: 13, prompt: 'Me distraigo menos cuando:', options: { A: 'Hay movimiento o actividad en el entorno.', B: 'Puedo mirar gráficos o ilustraciones.', C: 'Escucho la explicación con claridad.' } },
  { number: 14, prompt: 'Para aprender mejor, necesito:', options: { A: 'Ver ejemplos y detalles visuales.', B: 'Hablar y escuchar sobre el tema.', C: 'Hacerlo y sentir la experiencia.' } },
  { number: 15, prompt: 'Cuando alguien me da instrucciones, yo prefiero:', options: { A: 'Escuchar bien antes de actuar.', B: 'Verlas escritas o en un gráfico.', C: 'Ponermelas en práctica de inmediato.' } },
  { number: 16, prompt: 'Para estudiar, normalmente:', options: { A: 'Leo y reviso información visual.', B: 'Escucho grabaciones o explicaciones.', C: 'Realizo actividades prácticas.' } },
  { number: 17, prompt: 'Cuando me enfrento a un tema nuevo, mi primera reacción es:', options: { A: 'Moverme y probar distintas formas.', B: 'Escuchar una explicación.', C: 'Mirar ejemplos visuales.' } },
  { number: 18, prompt: 'Para recordar mejor una receta o procedimiento, me ayuda:', options: { A: 'Seguirla con los pasos y practicarla.', B: 'Escucharla mientras la explican.', C: 'Ver una imagen o un diagrama del proceso.' } },
  { number: 19, prompt: 'Cuando quiero comunicarme con claridad, prefiero:', options: { A: 'Explicar con palabras y ejemplos.', B: 'Usar gráficos o maquetas.', C: 'Demostrarlo con acciones o dinámicas.' } },
  { number: 20, prompt: 'En un taller o capacitación, me siento más cómodo cuando:', options: { A: 'Puedo observar o ver ejemplos.', B: 'Escucho instrucciones y luego pregunto.', C: 'Participo activamente en la práctica.' } },
  { number: 21, prompt: 'Cuando aprendo una nueva habilidad, prefiero:', options: { A: 'Ver a otra persona hacerlo y repetirlo.', B: 'Escuchar una explicación detallada.', C: 'Experimentar con movimiento y práctica.' } },
  { number: 22, prompt: 'Si debo preparar una presentación, me resulta mejor:', options: { A: 'Hacerla con movimiento, ejemplos o demostración práctica.', B: 'Explicar con palabras claras y pausas.', C: 'Usar gráficos, imágenes o diapositivas.' } },
  { number: 23, prompt: 'Para aprender a seguir instrucciones, me ayuda más:', options: { A: 'Verlas en un formato visual.', B: 'Escuchar la explicación oral.', C: 'Realizar el trabajo directamente.' } },
  { number: 24, prompt: 'Cuando alguien me da una idea, la entiendo mejor si:', options: { A: 'La escucho con atención.', B: 'La veo representada en un gráfico.', C: 'La pongo en práctica.' } },
  { number: 25, prompt: 'Cuando estudio, prefiero:', options: { A: 'Revisar textos, apuntes y material visual.', B: 'Escuchar explicaciones o grabaciones.', C: 'Resolver ejercicios y aplicar conceptos.' } },
  { number: 26, prompt: 'Para recordar datos importantes, me sirve más:', options: { A: 'Relacionarlos con una experiencia física.', B: 'Escribirlos o mirarlos en un esquema.', C: 'Escucharlos y repetírlos en voz alta.' } },
  { number: 27, prompt: 'Cuando tengo que aprender algo complejo, normalmente:', options: { A: 'Puedo escucharlo y repetirlo.', B: 'Lo convierto en un esquema o mapa mental.', C: 'Lo practico con ejemplos reales.' } },
  { number: 28, prompt: 'En una reunión o clase, tengo más facilidad para aprender cuando:', options: { A: 'Puedo moverme o participar activamente.', B: 'Veo la información escrita o visual.', C: 'Escucho la explicación.' } },
  { number: 29, prompt: 'Cuando doy una respuesta o resuelvo algo, normalmente:', options: { A: 'Lo explico verbalmente.', B: 'Lo visualizo en un esquema.', C: 'Lo hago con una demostración práctica.' } },
  { number: 30, prompt: 'Cuando necesito retener información, me ayuda más:', options: { A: 'Hacerlo con movimientos o acciones.', B: 'Mirar gráficos o mapas.', C: 'Escuchar la explicación.' } },
  { number: 31, prompt: 'En una actividad de aprendizaje, me siento más seguro cuando:', options: { A: 'Puedo escuchar la explicación con atención.', B: 'Veo claramente la información visual.', C: 'Lo realizo de forma práctica.' } },
  { number: 32, prompt: 'Si necesito recordar una secuencia, me resulta mejor:', options: { A: 'Hacer la actividad física y repetirla.', B: 'Mirar cómo se hace o seguir un esquema.', C: 'Escuchar la instrucción y repetirla.' } },
  { number: 33, prompt: 'Cuando me muestran una recomendación, prefiero:', options: { A: 'Escucharla y luego aplicarla.', B: 'Ver el ejemplo y la demostración.', C: 'Ejecutarla con práctica real.' } },
  { number: 34, prompt: 'Para recordar mejor un contenido, normalmente:', options: { A: 'Lo escucho y lo repito verbalmente.', B: 'Lo organizo en diagramas o cuadros.', C: 'Lo practico en situaciones concretas.' } },
  { number: 35, prompt: 'Cuando tengo que aprender algo en grupo, prefiero:', options: { A: 'Discutirlo y escuchar ideas.', B: 'Ver cómo lo expresan visualmente.', C: 'Participar y hacer una actividad práctica.' } },
  { number: 36, prompt: 'Cuando conozco una nueva idea, la entiendo mejor si:', options: { A: 'La observo en un ejemplo visual.', B: 'La escucho y la comparo con otras ideas.', C: 'La pongo en práctica de inmediato.' } },
  { number: 37, prompt: 'Para captar mejor un contenido, me ayuda más:', options: { A: 'Escuchar y explicar en voz alta.', B: 'Ver material gráfico o la pizarra.', C: 'Realizar una actividad y experimentar.' } },
  { number: 38, prompt: 'En una clase, me siento más presente si:', options: { A: 'Puedo participar con movimiento y práctica.', B: 'Mirando gráficos o notas.', C: 'Escuchando la explicación.' } },
  { number: 39, prompt: 'Cuando estudio, mi mejor estrategia es:', options: { A: 'Discutir y escuchar a otros.', B: 'Verlo y resumirlo en imágenes.', C: 'Hacer ejercicios y actividades prácticas.' } },
  { number: 40, prompt: 'Para aprender algo complejo, prefiero:', options: { A: 'Escuchar la explicación de alguien.', B: 'Ver representaciones y resúmenes visuales.', C: 'Demostrarlo con práctica y experiencia.' } }
];

const STYLE_TRANSLATIONS = {
  visual: 'Visual',
  auditory: 'Auditivo',
  kinesthetic: 'Cinestésico'
};

const PEDAGOGY_TIPS = {
  Visual: {
    title: 'Estilo de Aprendizaje Visual',
    description: 'Procesas la información con mayor facilidad cuando se presenta en formatos gráficos y estructurados.',
    tips: 'Te recomendamos utilizar mapas conceptuales, esquemas, resaltadores de colores, diagramas de flujo y resúmenes visuales. Asocia conceptos clave con imágenes y busca videos ilustrativos sobre los temas de estudio.'
  },
  Auditivo: {
    title: 'Estilo de Aprendizaje Auditivo',
    description: 'Retienes y comprendes mejor la información a través del lenguaje hablado y la escucha activa.',
    tips: 'Te recomendamos repasar en voz alta, participar en grupos de debate, grabar las explicaciones para escucharlas después y explicarle los conceptos a otra persona. Los podcasts educativos son excelentes aliados para ti.'
  },
  Cinestésico: {
    title: 'Estilo de Aprendizaje Cinestésico',
    description: 'Aprendes interactuando directamente con la realidad, mediante la práctica, el movimiento y la experiencia.',
    tips: 'Te sugerimos aprender haciendo: realiza simulaciones, experimentos, ejercicios prácticos y proyectos aplicados. Toma descansos breves para moverte durante largas sesiones de estudio y utiliza objetos o modelos táctiles.'
  },
  Multimodal: {
    title: 'Estilo de Aprendizaje Multimodal / Balanceado',
    description: 'Posees versatilidad cognitiva y puedes adaptarte con facilidad a múltiples formas de enseñanza.',
    tips: 'Aprovecha tu flexibilidad combinando recursos: lee y esquematiza (visual), debate y escucha explicaciones (auditivo), y pon a prueba tus conocimientos en la práctica (cinestésico).'
  }
};

const currentPage = document.body.dataset.page;

/* ========================================================= */
/* TOAST & ALERT UTILITIES                                   */
/* ========================================================= */
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
    : type === 'error'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px) scale(0.9)';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

function showAlert(element, message, kind = 'error') {
  if (!element) return;
  element.textContent = message;
  element.className = `alert ${kind} show`;
}

function hideAlert(element) {
  if (!element) return;
  element.textContent = '';
  element.className = 'alert';
}

function getSessionSlugFromPath() {
  const path = window.location.pathname;
  const match = path.match(/\/s\/(.+)|\/panel\/(.+)/);
  if (!match) return null;
  return match[1] || match[2] || null;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error en el servidor.');
  }
  return data;
}

function formatStyles(predominantStyles) {
  if (!Array.isArray(predominantStyles) || !predominantStyles.length) {
    return 'Sin resultado';
  }
  return predominantStyles.map(s => STYLE_TRANSLATIONS[s] || s).join(' / ');
}

/* ========================================================= */
/* PAGE: INSTRUCTOR CREATION (INDEX.HTML)                    */
/* ========================================================= */
async function createSessionHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitBtn = document.getElementById('create-session-btn');
  const alertBox = document.getElementById('session-alert');

  const instructorName = form.instructorName.value.trim();
  const programName = form.programName.value.trim();
  const groupNumber = form.groupNumber.value.trim();

  if (!instructorName || !programName || !groupNumber) {
    showAlert(alertBox, 'Todos los campos del formulario son obligatorios.', 'error');
    showToast('Por favor completa todos los campos.', 'error');
    return;
  }

  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin">
        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
      <span>Creando sesión…</span>
    `;
  }

  try {
    const data = await fetchJson('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ instructorName, programName, groupNumber })
    });

    showToast('¡Sesión creada exitosamente! Redirigiendo…', 'success');
    setTimeout(() => {
      window.location.href = `/panel/${data.slug}`;
    }, 600);
  } catch (error) {
    showAlert(alertBox, error.message, 'error');
    showToast(error.message, 'error');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}

/* ========================================================= */
/* PAGE: STUDENT QUESTIONNAIRE (SESSION.HTML)                */
/* ========================================================= */
function renderQuestionCard(question, answersMap) {
  const card = document.createElement('div');
  card.className = 'question-card';
  card.id = `q-card-${question.number}`;

  const top = document.createElement('div');
  top.className = 'question-top';

  const badge = document.createElement('span');
  badge.className = 'question-badge';
  badge.textContent = `Reactivo ${String(question.number).padStart(2, '0')} de 40`;

  const statusDot = document.createElement('span');
  statusDot.className = 'question-status-dot';
  statusDot.title = 'Estado de respuesta';

  top.appendChild(badge);
  top.appendChild(statusDot);

  const prompt = document.createElement('div');
  prompt.className = 'question-prompt';
  prompt.textContent = question.prompt;

  const optionList = document.createElement('div');
  optionList.className = 'option-list';

  Object.entries(question.options).forEach(([key, value]) => {
    const item = document.createElement('label');
    item.className = 'option-item';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question_${question.number}`;
    input.value = key;
    input.checked = answersMap[question.number] === key;

    const keyBubble = document.createElement('span');
    keyBubble.className = 'option-key-bubble';
    keyBubble.textContent = key;

    const text = document.createElement('span');
    text.className = 'option-text';
    text.textContent = value;

    item.appendChild(input);
    item.appendChild(keyBubble);
    item.appendChild(text);

    item.addEventListener('click', () => {
      input.checked = true;
      answersMap[question.number] = key;

      // Update active option classes
      const siblings = optionList.querySelectorAll('.option-item');
      siblings.forEach(s => s.classList.remove('selected'));
      item.classList.add('selected');
      card.classList.add('answered');

      updateProgress(answersMap);
    });

    optionList.appendChild(item);
  });

  card.appendChild(top);
  card.appendChild(prompt);
  card.appendChild(optionList);
  return card;
}

function updateProgress(answersMap) {
  const answeredCount = Object.keys(answersMap).length;
  const percent = Math.round((answeredCount / QUESTIONS.length) * 100);
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressPct = document.getElementById('progress-pct');

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${answeredCount} de ${QUESTIONS.length} respondidas`;
  if (progressPct) progressPct.textContent = `${percent}%`;
}

async function initStudentPage() {
  const slug = getSessionSlugFromPath();
  const form = document.getElementById('student-register-form');
  const regCard = document.getElementById('registration-card');
  const testSection = document.getElementById('test-section');
  const sessionBanner = document.getElementById('session-banner');
  const alertBox = document.getElementById('student-alert');
  const statusBadge = document.getElementById('session-status');

  if (!slug) {
    showAlert(alertBox, 'No se encontró el identificador de la sesión.', 'error');
    return;
  }

  try {
    const data = await fetchJson(`/api/sessions/${slug}`);

    document.getElementById('program-name').textContent = `Programa: ${data.programName}`;
    document.getElementById('group-number').textContent = data.groupNumber;
    sessionBanner.hidden = false;

    if (data.isClosed) {
      if (statusBadge) {
        statusBadge.textContent = 'Cerrada';
        statusBadge.className = 'badge closed';
      }
      if (form) form.style.display = 'none';
      if (regCard) {
        regCard.innerHTML = `
          <h2>Evaluación Finalizada</h2>
          <p>Esta encuesta ya fue cerrada por el instructor y sus resultados fueron consolidados en el reporte PDF.</p>
          <div style="margin-top: 20px;">
            <a href="/" class="btn btn-primary btn-lg" style="width: 100%;">
              <span>Ir al Inicio / Iniciar Nueva Sesión</span>
            </a>
          </div>
        `;
      }
      return;
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('studentName').value.trim();
      if (!name) {
        showAlert(alertBox, 'Por favor escribe tu nombre completo para continuar.', 'error');
        showToast('Escribe tu nombre para iniciar la prueba.', 'error');
        return;
      }

      try {
        const response = await fetchJson('/api/students', {
          method: 'POST',
          body: JSON.stringify({ slug: data.slug, name })
        });

        hideAlert(alertBox);
        regCard.hidden = true;
        testSection.hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const answersMap = {};
        const container = document.getElementById('questions-container');
        container.innerHTML = '';
        QUESTIONS.forEach((question) => {
          container.appendChild(renderQuestionCard(question, answersMap));
        });
        updateProgress(answersMap);

        const submitBtn = document.getElementById('submit-test-btn');
        submitBtn.addEventListener('click', async () => {
          // Check for unanswered questions
          const missingQuestion = QUESTIONS.find((q) => !answersMap[q.number]);
          if (missingQuestion) {
            showToast(`Falta responder el reactivo ${missingQuestion.number}.`, 'error');
            const targetEl = document.getElementById(`q-card-${missingQuestion.number}`);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              targetEl.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.4)';
              setTimeout(() => { targetEl.style.boxShadow = ''; }, 2000);
            }
            return;
          }

          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Procesando resultados…</span>`;

          try {
            const answerList = Object.entries(answersMap).map(([key, value]) => ({
              questionNumber: Number(key),
              selectedOption: value
            }));

            const result = await fetchJson(`/api/students/${response.student.id}/submit`, {
              method: 'POST',
              body: JSON.stringify({ answers: answerList })
            });

            const summary = result.result;
            const predominantKey = summary.predominantStyles?.[0] || 'multimodal';
            const predominantDisplay = summary.predominantLabel || 'Multimodal';
            const tipData = PEDAGOGY_TIPS[predominantDisplay] || PEDAGOGY_TIPS.Multimodal;

            const resultsMarkup = `
              <div class="results-wrapper">
                <div class="results-hero-card">
                  <span class="results-eyebrow">Diagnóstico Final Completado</span>
                  <h2>¡Felicitaciones, ${response.student.name}!</h2>
                  <p>Tu evaluación ha sido procesada exitosamente con base en el modelo VAK.</p>
                  <div>
                    <span class="results-dominant-pill">Estilo Dominante: ${predominantDisplay}</span>
                  </div>
                </div>

                <div class="results-cards-grid">
                  <div class="result-card visual">
                    <div class="result-card-header">
                      <span>CANAL VISUAL</span>
                      <span class="badge-style visual">V</span>
                    </div>
                    <div class="result-card-pct">${summary.visualPct}%</div>
                    <div class="result-card-points">${summary.visualPoints} de 40 puntos</div>
                  </div>

                  <div class="result-card auditory">
                    <div class="result-card-header">
                      <span>CANAL AUDITIVO</span>
                      <span class="badge-style auditory">A</span>
                    </div>
                    <div class="result-card-pct">${summary.auditoryPct}%</div>
                    <div class="result-card-points">${summary.auditoryPoints} de 40 puntos</div>
                  </div>

                  <div class="result-card kinesthetic">
                    <div class="result-card-header">
                      <span>CANAL CINESTÉSICO</span>
                      <span class="badge-style kinesthetic">K</span>
                    </div>
                    <div class="result-card-pct">${summary.kinestheticPct}%</div>
                    <div class="result-card-points">${summary.kinestheticPoints} de 40 puntos</div>
                  </div>
                </div>

                <div class="results-bars-section">
                  <h3 style="margin: 0 0 16px; font-size: 1.15rem; font-weight: 800;">Comparativa de Canales de Percepción</h3>
                  
                  <div class="bar-row-modern">
                    <span class="bar-row-label">Visual (V)</span>
                    <div class="bar-row-track">
                      <div class="bar-row-fill visual" style="width: ${summary.visualPct}%"></div>
                    </div>
                    <span class="bar-row-val">${summary.visualPct}%</span>
                  </div>

                  <div class="bar-row-modern">
                    <span class="bar-row-label">Auditivo (A)</span>
                    <div class="bar-row-track">
                      <div class="bar-row-fill auditory" style="width: ${summary.auditoryPct}%"></div>
                    </div>
                    <span class="bar-row-val">${summary.auditoryPct}%</span>
                  </div>

                  <div class="bar-row-modern">
                    <span class="bar-row-label">Cinestésico (K)</span>
                    <div class="bar-row-track">
                      <div class="bar-row-fill kinesthetic" style="width: ${summary.kinestheticPct}%"></div>
                    </div>
                    <span class="bar-row-val">${summary.kinestheticPct}%</span>
                  </div>
                </div>

                <div class="pedagogy-tips-card">
                  <h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Recomendaciones Pedagógicas para tu Estilo
                  </h4>
                  <p style="margin-bottom: 8px;"><strong>${tipData.description}</strong></p>
                  <p>${tipData.tips}</p>
                </div>

                <div style="margin-top: 24px; text-align: center;">
                  <a href="/s/${slug}" class="btn btn-secondary btn-lg" style="width: 100%;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                    <span>Realizar Otra Evaluación</span>
                  </a>
                </div>
              </div>
            `;

            container.innerHTML = resultsMarkup;
            document.querySelector('.test-sticky-bar')?.remove();
            document.querySelector('.test-submit-footer')?.remove();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('¡Tus respuestas fueron registradas correctamente!', 'success');
          } catch (error) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Finalizar y Enviar Test</span>`;
            showToast(error.message, 'error');
          }
        });
      } catch (error) {
        showAlert(alertBox, error.message, 'error');
        showToast(error.message, 'error');
      }
    });
  } catch (error) {
    showAlert(alertBox, error.message, 'error');
    showToast(error.message, 'error');
  }
}

/* ========================================================= */
/* PAGE: INSTRUCTOR DASHBOARD (INSTRUCTOR.HTML)              */
/* ========================================================= */
async function initInstructorPanel() {
  const slug = getSessionSlugFromPath();
  const alertBox = document.getElementById('panel-alert');
  const closeBtn = document.getElementById('close-session-btn');
  const downloadBtn = document.getElementById('download-pdf-btn');
  const previewBtn = document.getElementById('preview-pdf-btn');
  const copyBtn = document.getElementById('copy-link-btn');
  const searchInput = document.getElementById('students-search');

  // Modal elements
  const pdfModal = document.getElementById('pdf-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDownloadBtn = document.getElementById('modal-download-btn');
  const modalIframe = document.getElementById('modal-pdf-iframe');

  if (!slug) {
    showAlert(alertBox, 'No se encontró la sesión solicitada.', 'error');
    return;
  }

  let cachedStudents = [];

  const renderTableRows = (students) => {
    const tbody = document.getElementById('students-table-body');
    if (!tbody) return;

    const searchTerm = (searchInput?.value || '').trim().toLowerCase();
    const filtered = searchTerm
      ? students.filter(s => (s.name || '').toLowerCase().includes(searchTerm))
      : students;

    if (!filtered.length) {
      if (students.length === 0) {
        tbody.innerHTML = `
          <tr class="empty-state-row">
            <td colspan="7">
              <div class="empty-state-wrap">
                <div class="empty-icon-bubble">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <strong>Todavía no hay participantes registrados</strong>
                <p>Comparte el enlace con tu grupo para comenzar a recibir las respuestas.</p>
              </div>
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = `
          <tr class="empty-state-row">
            <td colspan="7">
              <div class="empty-state-wrap">
                <strong>No se encontraron coincidencias para "${searchTerm}"</strong>
                <p>Intenta con otro término de búsqueda.</p>
              </div>
            </td>
          </tr>
        `;
      }
      return;
    }

    tbody.innerHTML = filtered.map((student, idx) => {
      const isComp = Boolean(student.completed);
      const visualPct = student.visualPct ?? 0;
      const auditoryPct = student.auditoryPct ?? 0;
      const kinestheticPct = student.kinestheticPct ?? 0;

      let styleBadgeClass = 'pending';
      if (isComp) {
        if (student.predominantStyles?.includes('visual')) styleBadgeClass = 'visual';
        else if (student.predominantStyles?.includes('auditory')) styleBadgeClass = 'auditory';
        else if (student.predominantStyles?.includes('kinesthetic')) styleBadgeClass = 'kinesthetic';
        else styleBadgeClass = 'multimodal';
      }

      const styleLabel = isComp ? formatStyles(student.predominantStyles) : 'Pendiente';
      const initials = (student.name || 'E')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      return `
        <tr>
          <td style="color: var(--text-muted); font-size: 0.8rem; font-weight: 700;">${idx + 1}</td>
          <td>
            <div class="student-name-cell">
              <div class="student-avatar" aria-hidden="true">${initials}</div>
              <span>${student.name}</span>
            </div>
          </td>
          <td>
            <div class="score-cell">
              <div class="mini-score-bar">
                <div class="mini-score-fill visual" style="width: ${isComp ? visualPct : 0}%"></div>
              </div>
              <strong style="color: var(--visual-color);">${isComp ? `${visualPct}%` : '-'}</strong>
            </div>
          </td>
          <td>
            <div class="score-cell">
              <div class="mini-score-bar">
                <div class="mini-score-fill auditory" style="width: ${isComp ? auditoryPct : 0}%"></div>
              </div>
              <strong style="color: var(--auditory-color);">${isComp ? `${auditoryPct}%` : '-'}</strong>
            </div>
          </td>
          <td>
            <div class="score-cell">
              <div class="mini-score-bar">
                <div class="mini-score-fill kinesthetic" style="width: ${isComp ? kinestheticPct : 0}%"></div>
              </div>
              <strong style="color: var(--kinesthetic-color);">${isComp ? `${kinestheticPct}%` : '-'}</strong>
            </div>
          </td>
          <td>
            <span class="badge-style ${styleBadgeClass}">${styleLabel}</span>
          </td>
          <td>
            <span class="badge ${isComp ? 'active' : 'closed'}">
              ${isComp ? 'Completado' : 'Pendiente'}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  };

  const refresh = async () => {
    try {
      const data = await fetchJson(`/api/sessions/${slug}`);

      // Update Header & Meta
      const titleEl = document.getElementById('panel-title');
      if (titleEl) titleEl.textContent = `Panel: ${data.instructorName}`;

      const progEl = document.getElementById('panel-program');
      if (progEl) progEl.textContent = data.programName;

      const grpEl = document.getElementById('panel-group');
      if (grpEl) grpEl.textContent = data.groupNumber;

      const linkEl = document.getElementById('panel-link');
      if (linkEl) {
        linkEl.textContent = data.shareUrl;
        linkEl.href = data.shareUrl;
      }

      const statusBadge = document.getElementById('panel-status');
      if (statusBadge) {
        statusBadge.textContent = data.status;
        statusBadge.className = `badge ${data.isClosed ? 'closed' : 'active'}`;
      }

      const sessionState = document.getElementById('session-state');
      if (sessionState) sessionState.textContent = data.status;

      // Enable/disable PDF buttons based on isClosed
      if (downloadBtn) downloadBtn.disabled = !data.isClosed;
      if (previewBtn) previewBtn.disabled = !data.isClosed;
      if (closeBtn) closeBtn.disabled = Boolean(data.isClosed);

      const totalEl = document.getElementById('total-participants');
      if (totalEl) totalEl.textContent = data.students.length;

      // Group Averages Calculation
      const completed = data.students.filter(s => s.completed);
      const compCountEl = document.getElementById('completed-count-text');
      if (compCountEl) {
        compCountEl.textContent = `${completed.length} completados (${data.students.length > 0 ? Math.round((completed.length / data.students.length) * 100) : 0}%)`;
      }

      const avgV = completed.length ? Math.round(completed.reduce((a, s) => a + (s.visualPct || 0), 0) / completed.length) : 0;
      const avgA = completed.length ? Math.round(completed.reduce((a, s) => a + (s.auditoryPct || 0), 0) / completed.length) : 0;
      const avgK = completed.length ? Math.round(completed.reduce((a, s) => a + (s.kinestheticPct || 0), 0) / completed.length) : 0;

      const elV = document.getElementById('avg-visual');
      const elA = document.getElementById('avg-auditory');
      const elK = document.getElementById('avg-kinesthetic');
      if (elV) elV.textContent = `${avgV}%`;
      if (elA) elA.textContent = `${avgA}%`;
      if (elK) elK.textContent = `${avgK}%`;

      // Update table if data changed
      cachedStudents = data.students;
      renderTableRows(cachedStudents);
    } catch (error) {
      showAlert(alertBox, error.message, 'error');
    }
  };

  // Search input live filtering
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderTableRows(cachedStudents);
    });
  }

  // Copy share URL button
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const linkEl = document.getElementById('panel-link');
      const urlToCopy = linkEl ? linkEl.href : '';
      if (!urlToCopy) return;

      try {
        await navigator.clipboard.writeText(urlToCopy);
        showToast('¡Enlace copiado al portapapeles!', 'success');
      } catch (err) {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = urlToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('¡Enlace copiado al portapapeles!', 'success');
      }
    });
  }

  // Close Session
  if (closeBtn) {
    closeBtn.addEventListener('click', async () => {
      const confirmed = window.confirm(
        '¿Deseas cerrar la encuesta definitivamente?\n\nAl cerrarla, ya no se aceptarán nuevos participantes y se habilitará la generación del reporte PDF.'
      );
      if (!confirmed) return;

      try {
        closeBtn.disabled = true;
        const data = await fetchJson(`/api/sessions/${slug}/close`, { method: 'POST' });
        showToast('La encuesta ha sido cerrada exitosamente.', 'success');
        showAlert(alertBox, 'La encuesta se encuentra cerrada. Ahora puedes exportar el reporte PDF.', 'success');
        await refresh();
      } catch (error) {
        closeBtn.disabled = false;
        showAlert(alertBox, error.message, 'error');
        showToast(error.message, 'error');
      }
    });
  }

  // Reset Session
  const resetBtn = document.getElementById('reset-session-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      const confirmed = window.confirm(
        '¿Deseas reiniciar esta encuesta?\n\nSe limpiarán todos los registros de los participantes y la encuesta quedará activa nuevamente para nuevas respuestas.'
      );
      if (!confirmed) return;

      try {
        resetBtn.disabled = true;
        await fetchJson(`/api/sessions/${slug}/reset`, { method: 'POST' });
        showToast('La encuesta fue reiniciada y se encuentra activa.', 'success');
        showAlert(alertBox, 'La encuesta fue reiniciada correctamente.', 'success');
        await refresh();
      } catch (error) {
        showToast(error.message, 'error');
        showAlert(alertBox, error.message, 'error');
      } finally {
        resetBtn.disabled = false;
      }
    });
  }

  // Direct Download PDF
  const triggerDownload = async () => {
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = `<span>Generando PDF…</span>`;
    }

    try {
      const response = await fetch(`/api/sessions/${slug}/report`);
      if (!response.ok) {
        throw new Error('No se pudo generar el documento PDF.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Reporte_VAK_${slug}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      showToast('¡Reporte PDF descargado exitosamente!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Descargar PDF</span>
        `;
      }
    }
  };

  if (downloadBtn) {
    downloadBtn.addEventListener('click', triggerDownload);
  }

  // Modal PDF Preview handlers
  const openModal = () => {
    if (!pdfModal || !modalIframe) return;
    modalIframe.src = `/api/sessions/${slug}/report?preview=true`;
    pdfModal.classList.add('open');
    pdfModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!pdfModal || !modalIframe) return;
    pdfModal.classList.remove('open');
    pdfModal.setAttribute('aria-hidden', 'true');
    modalIframe.src = 'about:blank';
    document.body.style.overflow = '';
  };

  if (previewBtn) previewBtn.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDownloadBtn) modalDownloadBtn.addEventListener('click', triggerDownload);

  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal?.classList.contains('open')) {
      closeModal();
    }
  });

  await refresh();
  const refreshInterval = setInterval(refresh, 2500);
  window.addEventListener('beforeunload', () => clearInterval(refreshInterval));
}

/* ========================================================= */
/* PAGE ROUTER INITIALIZATION                                */
/* ========================================================= */
if (currentPage === 'instructor') {
  document.getElementById('session-form')?.addEventListener('submit', createSessionHandler);
}

if (currentPage === 'student') {
  initStudentPage();
}

if (currentPage === 'instructor-panel') {
  initInstructorPanel();
}
