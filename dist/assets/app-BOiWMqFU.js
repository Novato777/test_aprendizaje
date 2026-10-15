var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((()=>{var e=[{number:1,prompt:`Cuando quiero recordar información nueva, me resulta más fácil:`,options:{A:`Escuchar la explicación del tema.`,B:`Ver un esquema o una imagen del tema.`,C:`Aplicarlo de inmediato en una práctica.`}},{number:2,prompt:`Si voy a aprender a usar una herramienta nueva, primero:`,options:{A:`Leo el manual o miro una demostración visual.`,B:`Escucho la explicación de alguien.`,C:`La pruebo yo mismo para entenderla.`}},{number:3,prompt:`Cuando necesito estudiar para un examen, prefiero:`,options:{A:`Repasar con alguien que me explique.`,B:`Consultar diagramas, mapas o apuntes visuales.`,C:`Hacer ejercicios y practicar.`}},{number:4,prompt:`En una clase, me concentro mejor cuando:`,options:{A:`Puedo moverme o participar activamente.`,B:`Escucho atentamente la explicación.`,C:`Veo ejemplos visuales en la pizarra o pantalla.`}},{number:5,prompt:`Para comprender un concepto difícil, me ayuda más:`,options:{A:`Probarlo con un ejercicio práctico.`,B:`Escuchar la explicación con calma.`,C:`Mirar gráficos o representaciones visuales.`}},{number:6,prompt:`Cuando alguien explica algo, yo suelo recordar mejor:`,options:{A:`Lo que escucho con atención.`,B:`Las palabras y ejemplos que veo.`,C:`La experiencia o la acción que se realiza.`}},{number:7,prompt:`Si quiero aprender una canción nueva, prefiero:`,options:{A:`Escucharla varias veces.`,B:`Ver la partitura o una representación visual.`,C:`Cantarla o repetirla con movimiento.`}},{number:8,prompt:`Me siento más motivado cuando:`,options:{A:`Puedo discutir y escuchar a otros.`,B:`Veo un ejemplo claro o un video.`,C:`Participo haciendo algo con mis manos.`}},{number:9,prompt:`Cuando me explican un procedimiento, prefiero:`,options:{A:`Seguir el paso a paso con acciones concretas.`,B:`Escuchar la explicación verbal.`,C:`Ver una imagen o esquema del procedimiento.`}},{number:10,prompt:`Para recordar información, me sirve más:`,options:{A:`Asociarla con una imagen o color.`,B:`Repetirla en voz alta o explicársela a otra persona.`,C:`Relacionarla con una experiencia física y práctica.`}},{number:11,prompt:`Al resolver un problema, normalmente:`,options:{A:`Lo analizo con una explicación verbal.`,B:`Lo visualizo con un esquema o dibujo.`,C:`Lo pruebo directamente y ajusto el proceso.`}},{number:12,prompt:`Cuando me enseñan algo nuevo, me gusta:`,options:{A:`Ver cómo lo hacen en una demostración.`,B:`Escuchar la explicación detenidamente.`,C:`Ponerlo en práctica yo mismo.`}},{number:13,prompt:`Me distraigo menos cuando:`,options:{A:`Hay movimiento o actividad en el entorno.`,B:`Puedo mirar gráficos o ilustraciones.`,C:`Escucho la explicación con claridad.`}},{number:14,prompt:`Para aprender mejor, necesito:`,options:{A:`Ver ejemplos y detalles visuales.`,B:`Hablar y escuchar sobre el tema.`,C:`Hacerlo y sentir la experiencia.`}},{number:15,prompt:`Cuando alguien me da instrucciones, yo prefiero:`,options:{A:`Escuchar bien antes de actuar.`,B:`Verlas escritas o en un gráfico.`,C:`Ponermelas en práctica de inmediato.`}},{number:16,prompt:`Para estudiar, normalmente:`,options:{A:`Leo y reviso información visual.`,B:`Escucho grabaciones o explicaciones.`,C:`Realizo actividades prácticas.`}},{number:17,prompt:`Cuando me enfrento a un tema nuevo, mi primera reacción es:`,options:{A:`Moverme y probar distintas formas.`,B:`Escuchar una explicación.`,C:`Mirar ejemplos visuales.`}},{number:18,prompt:`Para recordar mejor una receta o procedimiento, me ayuda:`,options:{A:`Seguirla con los pasos y practicarla.`,B:`Escucharla mientras la explican.`,C:`Ver una imagen o un diagrama del proceso.`}},{number:19,prompt:`Cuando quiero comunicarme con claridad, prefiero:`,options:{A:`Explicar con palabras y ejemplos.`,B:`Usar gráficos o maquetas.`,C:`Demostrarlo con acciones o dinámicas.`}},{number:20,prompt:`En un taller o capacitación, me siento más cómodo cuando:`,options:{A:`Puedo observar o ver ejemplos.`,B:`Escucho instrucciones y luego pregunto.`,C:`Participo activamente en la práctica.`}},{number:21,prompt:`Cuando aprendo una nueva habilidad, prefiero:`,options:{A:`Ver a otra persona hacerlo y repetirlo.`,B:`Escuchar una explicación detallada.`,C:`Experimentar con movimiento y práctica.`}},{number:22,prompt:`Si debo preparar una presentación, me resulta mejor:`,options:{A:`Hacerla con movimiento, ejemplos o demostración práctica.`,B:`Explicar con palabras claras y pausas.`,C:`Usar gráficos, imágenes o diapositivas.`}},{number:23,prompt:`Para aprender a seguir instrucciones, me ayuda más:`,options:{A:`Verlas en un formato visual.`,B:`Escuchar la explicación oral.`,C:`Realizar el trabajo directamente.`}},{number:24,prompt:`Cuando alguien me da una idea, la entiendo mejor si:`,options:{A:`La escucho con atención.`,B:`La veo representada en un gráfico.`,C:`La pongo en práctica.`}},{number:25,prompt:`Cuando estudio, prefiero:`,options:{A:`Revisar textos, apuntes y material visual.`,B:`Escuchar explicaciones o grabaciones.`,C:`Resolver ejercicios y aplicar conceptos.`}},{number:26,prompt:`Para recordar datos importantes, me sirve más:`,options:{A:`Relacionarlos con una experiencia física.`,B:`Escribirlos o mirarlos en un esquema.`,C:`Escucharlos y repetírlos en voz alta.`}},{number:27,prompt:`Cuando tengo que aprender algo complejo, normalmente:`,options:{A:`Puedo escucharlo y repetirlo.`,B:`Lo convierto en un esquema o mapa mental.`,C:`Lo practico con ejemplos reales.`}},{number:28,prompt:`En una reunión o clase, tengo más facilidad para aprender cuando:`,options:{A:`Puedo moverme o participar activamente.`,B:`Veo la información escrita o visual.`,C:`Escucho la explicación.`}},{number:29,prompt:`Cuando doy una respuesta o resuelvo algo, normalmente:`,options:{A:`Lo explico verbalmente.`,B:`Lo visualizo en un esquema.`,C:`Lo hago con una demostración práctica.`}},{number:30,prompt:`Cuando necesito retener información, me ayuda más:`,options:{A:`Hacerlo con movimientos o acciones.`,B:`Mirar gráficos o mapas.`,C:`Escuchar la explicación.`}},{number:31,prompt:`En una actividad de aprendizaje, me siento más seguro cuando:`,options:{A:`Puedo escuchar la explicación con atención.`,B:`Veo claramente la información visual.`,C:`Lo realizo de forma práctica.`}},{number:32,prompt:`Si necesito recordar una secuencia, me resulta mejor:`,options:{A:`Hacer la actividad física y repetirla.`,B:`Mirar cómo se hace o seguir un esquema.`,C:`Escuchar la instrucción y repetirla.`}},{number:33,prompt:`Cuando me muestran una recomendación, prefiero:`,options:{A:`Escucharla y luego aplicarla.`,B:`Ver el ejemplo y la demostración.`,C:`Ejecutarla con práctica real.`}},{number:34,prompt:`Para recordar mejor un contenido, normalmente:`,options:{A:`Lo escucho y lo repito verbalmente.`,B:`Lo organizo en diagramas o cuadros.`,C:`Lo practico en situaciones concretas.`}},{number:35,prompt:`Cuando tengo que aprender algo en grupo, prefiero:`,options:{A:`Discutirlo y escuchar ideas.`,B:`Ver cómo lo expresan visualmente.`,C:`Participar y hacer una actividad práctica.`}},{number:36,prompt:`Cuando conozco una nueva idea, la entiendo mejor si:`,options:{A:`La observo en un ejemplo visual.`,B:`La escucho y la comparo con otras ideas.`,C:`La pongo en práctica de inmediato.`}},{number:37,prompt:`Para captar mejor un contenido, me ayuda más:`,options:{A:`Escuchar y explicar en voz alta.`,B:`Ver material gráfico o la pizarra.`,C:`Realizar una actividad y experimentar.`}},{number:38,prompt:`En una clase, me siento más presente si:`,options:{A:`Puedo participar con movimiento y práctica.`,B:`Mirando gráficos o notas.`,C:`Escuchando la explicación.`}},{number:39,prompt:`Cuando estudio, mi mejor estrategia es:`,options:{A:`Discutir y escuchar a otros.`,B:`Verlo y resumirlo en imágenes.`,C:`Hacer ejercicios y actividades prácticas.`}},{number:40,prompt:`Para aprender algo complejo, prefiero:`,options:{A:`Escuchar la explicación de alguien.`,B:`Ver representaciones y resúmenes visuales.`,C:`Demostrarlo con práctica y experiencia.`}}],t={visual:`Visual`,auditory:`Auditivo`,kinesthetic:`Cinestésico`},n={Visual:{title:`Estilo de Aprendizaje Visual`,description:`Procesas la información con mayor facilidad cuando se presenta en formatos gráficos y estructurados.`,tips:`Te recomendamos utilizar mapas conceptuales, esquemas, resaltadores de colores, diagramas de flujo y resúmenes visuales. Asocia conceptos clave con imágenes y busca videos ilustrativos sobre los temas de estudio.`},Auditivo:{title:`Estilo de Aprendizaje Auditivo`,description:`Retienes y comprendes mejor la información a través del lenguaje hablado y la escucha activa.`,tips:`Te recomendamos repasar en voz alta, participar en grupos de debate, grabar las explicaciones para escucharlas después y explicarle los conceptos a otra persona. Los podcasts educativos son excelentes aliados para ti.`},Cinestésico:{title:`Estilo de Aprendizaje Cinestésico`,description:`Aprendes interactuando directamente con la realidad, mediante la práctica, el movimiento y la experiencia.`,tips:`Te sugerimos aprender haciendo: realiza simulaciones, experimentos, ejercicios prácticos y proyectos aplicados. Toma descansos breves para moverte durante largas sesiones de estudio y utiliza objetos o modelos táctiles.`},Multimodal:{title:`Estilo de Aprendizaje Multimodal / Balanceado`,description:`Posees versatilidad cognitiva y puedes adaptarte con facilidad a múltiples formas de enseñanza.`,tips:`Aprovecha tu flexibilidad combinando recursos: lee y esquematiza (visual), debate y escucha explicaciones (auditivo), y pon a prueba tus conocimientos en la práctica (cinestésico).`}},r=document.body.dataset.page;function i(e,t=`info`,n=3500){let r=document.getElementById(`toast-container`);r||(r=document.createElement(`div`),r.id=`toast-container`,r.className=`toast-container`,document.body.appendChild(r));let i=document.createElement(`div`);i.className=`toast ${t}`,i.innerHTML=`${t===`success`?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`:t===`error`?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`}<span>${e}</span>`,r.appendChild(i),setTimeout(()=>{i.style.opacity=`0`,i.style.transform=`translateY(12px) scale(0.9)`,setTimeout(()=>i.remove(),250)},n)}function a(e,t,n=`error`){e&&(e.textContent=t,e.className=`alert ${n} show`)}function o(e){e&&(e.textContent=``,e.className=`alert`)}function s(){let e=window.location.pathname.match(/\/s\/(.+)|\/panel\/(.+)/);return e&&(e[1]||e[2])||null}async function c(e,t={}){let n=await fetch(e,{headers:{"Content-Type":`application/json`},...t}),r=await n.text(),i={};if(r)try{i=JSON.parse(r)}catch{i={error:r.slice(0,180)}}if(!n.ok)throw Error(i.error||`Ocurrió un error en el servidor.`);return i}function l(e){return!Array.isArray(e)||!e.length?`Sin resultado`:e.map(e=>t[e]||e).join(` / `)}async function u(e){e.preventDefault();let t=e.currentTarget,n=document.getElementById(`create-session-btn`),r=document.getElementById(`session-alert`),o=t.instructorName.value.trim(),s=t.programName.value.trim(),l=t.groupNumber.value.trim();if(!o||!s||!l){a(r,`Todos los campos del formulario son obligatorios.`,`error`),i(`Por favor completa todos los campos.`,`error`);return}let u=n?n.innerHTML:``;n&&(n.disabled=!0,n.innerHTML=`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin">
        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
      <span>Creando sesión…</span>
    `);try{let e=await c(`/api/sessions`,{method:`POST`,body:JSON.stringify({instructorName:o,programName:s,groupNumber:l})});i(`¡Sesión creada exitosamente! Redirigiendo…`,`success`),setTimeout(()=>{window.location.href=`/panel/${e.slug}`},600)}catch(e){a(r,e.message,`error`),i(e.message,`error`),n&&(n.disabled=!1,n.innerHTML=u)}}function d(e,t){let n=document.createElement(`div`);n.className=`question-card`,n.id=`q-card-${e.number}`;let r=document.createElement(`div`);r.className=`question-top`;let i=document.createElement(`span`);i.className=`question-badge`,i.textContent=`Reactivo ${String(e.number).padStart(2,`0`)} de 40`;let a=document.createElement(`span`);a.className=`question-status-dot`,a.title=`Estado de respuesta`,r.appendChild(i),r.appendChild(a);let o=document.createElement(`div`);o.className=`question-prompt`,o.textContent=e.prompt;let s=document.createElement(`div`);return s.className=`option-list`,Object.entries(e.options).forEach(([r,i])=>{let a=document.createElement(`label`);a.className=`option-item`;let o=document.createElement(`input`);o.type=`radio`,o.name=`question_${e.number}`,o.value=r,o.checked=t[e.number]===r;let c=document.createElement(`span`);c.className=`option-key-bubble`,c.textContent=r;let l=document.createElement(`span`);l.className=`option-text`,l.textContent=i,a.appendChild(o),a.appendChild(c),a.appendChild(l),a.addEventListener(`click`,()=>{o.checked=!0,t[e.number]=r,s.querySelectorAll(`.option-item`).forEach(e=>e.classList.remove(`selected`)),a.classList.add(`selected`),n.classList.add(`answered`),f(t)}),s.appendChild(a)}),n.appendChild(r),n.appendChild(o),n.appendChild(s),n}function f(t){let n=Object.keys(t).length,r=Math.round(n/e.length*100),i=document.getElementById(`progress-bar`),a=document.getElementById(`progress-text`),o=document.getElementById(`progress-pct`);i&&(i.style.width=`${r}%`),a&&(a.textContent=`${n} de ${e.length} respondidas`),o&&(o.textContent=`${r}%`)}async function p(){let t=s(),r=document.getElementById(`student-register-form`),l=document.getElementById(`registration-card`),u=document.getElementById(`test-section`),p=document.getElementById(`session-banner`),m=document.getElementById(`student-alert`),h=document.getElementById(`session-status`);if(!t)a(m,`No se encontró el identificador de la sesión.`,`error`);else try{let s=await c(`/api/sessions/${t}`);if(document.getElementById(`program-name`).textContent=`Programa: ${s.programName}`,document.getElementById(`group-number`).textContent=s.groupNumber,p.hidden=!1,s.isClosed){h&&(h.textContent=`Cerrada`,h.className=`badge closed`),r&&(r.style.display=`none`),l&&(l.innerHTML=`
          <h2>Evaluación Finalizada</h2>
          <p>Esta encuesta ya fue cerrada por el instructor y sus resultados fueron consolidados en el reporte PDF.</p>
          <div style="margin-top: 20px;">
            <a href="/" class="btn btn-primary btn-lg" style="width: 100%;">
              <span>Ir al Inicio / Iniciar Nueva Sesión</span>
            </a>
          </div>
        `);return}r.addEventListener(`submit`,async r=>{r.preventDefault();let p=document.getElementById(`studentName`).value.trim();if(!p)a(m,`Por favor escribe tu nombre completo para continuar.`,`error`),i(`Escribe tu nombre para iniciar la prueba.`,`error`);else try{let r=await c(`/api/students`,{method:`POST`,body:JSON.stringify({slug:s.slug,name:p})});o(m),l.hidden=!0,u.hidden=!1,window.scrollTo({top:0,behavior:`smooth`});let a={},h=document.getElementById(`questions-container`);h.innerHTML=``,e.forEach(e=>{h.appendChild(d(e,a))}),f(a);let g=document.getElementById(`submit-test-btn`);g.addEventListener(`click`,async()=>{let o=e.find(e=>!a[e.number]);if(o){i(`Falta responder el reactivo ${o.number}.`,`error`);let e=document.getElementById(`q-card-${o.number}`);e&&(e.scrollIntoView({behavior:`smooth`,block:`center`}),e.style.boxShadow=`0 0 0 3px rgba(239, 68, 68, 0.4)`,setTimeout(()=>{e.style.boxShadow=``},2e3))}else{g.disabled=!0,g.innerHTML=`<span>Procesando resultados…</span>`;try{let e=Object.entries(a).map(([e,t])=>({questionNumber:Number(e),selectedOption:t})),o=(await c(`/api/students/${r.student.id}/submit`,{method:`POST`,body:JSON.stringify({answers:e})})).result;o.predominantStyles?.[0];let s=o.predominantLabel||`Multimodal`,l=n[s]||n.Multimodal,u=`
              <div class="results-wrapper">
                <div class="results-hero-card">
                  <span class="results-eyebrow">Diagnóstico Final Completado</span>
                  <h2>¡Felicitaciones, ${r.student.name}!</h2>
                  <p>Tu evaluación ha sido procesada exitosamente con base en el modelo VAK.</p>
                  <div>
                    <span class="results-dominant-pill">Estilo Dominante: ${s}</span>
                  </div>
                </div>

                <div class="results-cards-grid">
                  <div class="result-card visual">
                    <div class="result-card-header">
                      <span>CANAL VISUAL</span>
                      <span class="badge-style visual">V</span>
                    </div>
                    <div class="result-card-pct">${o.visualPct}%</div>
                    <div class="result-card-points">${o.visualPoints} de 40 puntos</div>
                  </div>

                  <div class="result-card auditory">
                    <div class="result-card-header">
                      <span>CANAL AUDITIVO</span>
                      <span class="badge-style auditory">A</span>
                    </div>
                    <div class="result-card-pct">${o.auditoryPct}%</div>
                    <div class="result-card-points">${o.auditoryPoints} de 40 puntos</div>
                  </div>

                  <div class="result-card kinesthetic">
                    <div class="result-card-header">
                      <span>CANAL CINESTÉSICO</span>
                      <span class="badge-style kinesthetic">K</span>
                    </div>
                    <div class="result-card-pct">${o.kinestheticPct}%</div>
                    <div class="result-card-points">${o.kinestheticPoints} de 40 puntos</div>
                  </div>
                </div>

                <div class="results-bars-section">
                  <h3 style="margin: 0 0 16px; font-size: 1.15rem; font-weight: 800;">Comparativa de Canales de Percepción</h3>
                  
                  <div class="bar-row-modern">
                    <span class="bar-row-label">Visual (V)</span>
                    <div class="bar-row-track">
                      <div class="bar-row-fill visual" style="width: ${o.visualPct}%"></div>
                    </div>
                    <span class="bar-row-val">${o.visualPct}%</span>
                  </div>

                  <div class="bar-row-modern">
                    <span class="bar-row-label">Auditivo (A)</span>
                    <div class="bar-row-track">
                      <div class="bar-row-fill auditory" style="width: ${o.auditoryPct}%"></div>
                    </div>
                    <span class="bar-row-val">${o.auditoryPct}%</span>
                  </div>

                  <div class="bar-row-modern">
                    <span class="bar-row-label">Cinestésico (K)</span>
                    <div class="bar-row-track">
                      <div class="bar-row-fill kinesthetic" style="width: ${o.kinestheticPct}%"></div>
                    </div>
                    <span class="bar-row-val">${o.kinestheticPct}%</span>
                  </div>
                </div>

                <div class="pedagogy-tips-card">
                  <h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Recomendaciones Pedagógicas para tu Estilo
                  </h4>
                  <p style="margin-bottom: 8px;"><strong>${l.description}</strong></p>
                  <p>${l.tips}</p>
                </div>

                <div style="margin-top: 24px; text-align: center;">
                  <a href="/s/${t}" class="btn btn-secondary btn-lg" style="width: 100%;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                    <span>Realizar Otra Evaluación</span>
                  </a>
                </div>
              </div>
            `;h.innerHTML=u,document.querySelector(`.test-sticky-bar`)?.remove(),document.querySelector(`.test-submit-footer`)?.remove(),window.scrollTo({top:0,behavior:`smooth`}),i(`¡Tus respuestas fueron registradas correctamente!`,`success`)}catch(e){g.disabled=!1,g.innerHTML=`<span>Finalizar y Enviar Test</span>`,i(e.message,`error`)}}})}catch(e){a(m,e.message,`error`),i(e.message,`error`)}})}catch(e){a(m,e.message,`error`),i(e.message,`error`)}}async function m(){let e=s(),t=document.getElementById(`panel-alert`),n=document.getElementById(`close-session-btn`),r=document.getElementById(`download-pdf-btn`),o=document.getElementById(`preview-pdf-btn`),u=document.getElementById(`copy-link-btn`),d=document.getElementById(`students-search`),f=document.getElementById(`pdf-modal`),p=document.getElementById(`modal-close-btn`),m=document.getElementById(`modal-download-btn`),h=document.getElementById(`modal-pdf-iframe`);if(!e){a(t,`No se encontró la sesión solicitada.`,`error`);return}let g=[],_=e=>{let t=document.getElementById(`students-table-body`);if(!t)return;let n=(d?.value||``).trim().toLowerCase(),r=n?e.filter(e=>(e.name||``).toLowerCase().includes(n)):e;t.innerHTML=r.length?r.map((e,t)=>{let n=!!e.completed,r=e.visualPct??0,i=e.auditoryPct??0,a=e.kinestheticPct??0,o=`pending`;n&&(o=e.predominantStyles?.includes(`visual`)?`visual`:e.predominantStyles?.includes(`auditory`)?`auditory`:e.predominantStyles?.includes(`kinesthetic`)?`kinesthetic`:`multimodal`);let s=n?l(e.predominantStyles):`Pendiente`,c=(e.name||`E`).split(` `).map(e=>e[0]).slice(0,2).join(``).toUpperCase();return`
        <tr>
          <td style="color: var(--text-muted); font-size: 0.8rem; font-weight: 700;">${t+1}</td>
          <td>
            <div class="student-name-cell">
              <div class="student-avatar" aria-hidden="true">${c}</div>
              <span>${e.name}</span>
            </div>
          </td>
          <td>
            <div class="score-cell">
              <div class="mini-score-bar">
                <div class="mini-score-fill visual" style="width: ${n?r:0}%"></div>
              </div>
              <strong style="color: var(--visual-color);">${n?`${r}%`:`-`}</strong>
            </div>
          </td>
          <td>
            <div class="score-cell">
              <div class="mini-score-bar">
                <div class="mini-score-fill auditory" style="width: ${n?i:0}%"></div>
              </div>
              <strong style="color: var(--auditory-color);">${n?`${i}%`:`-`}</strong>
            </div>
          </td>
          <td>
            <div class="score-cell">
              <div class="mini-score-bar">
                <div class="mini-score-fill kinesthetic" style="width: ${n?a:0}%"></div>
              </div>
              <strong style="color: var(--kinesthetic-color);">${n?`${a}%`:`-`}</strong>
            </div>
          </td>
          <td>
            <span class="badge-style ${o}">${s}</span>
          </td>
          <td>
            <span class="badge ${n?`active`:`closed`}">
              ${n?`Completado`:`Pendiente`}
            </span>
          </td>
        </tr>
      `}).join(``):e.length===0?`
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
        `:`
          <tr class="empty-state-row">
            <td colspan="7">
              <div class="empty-state-wrap">
                <strong>No se encontraron coincidencias para "${n}"</strong>
                <p>Intenta con otro término de búsqueda.</p>
              </div>
            </td>
          </tr>
        `},v=async()=>{try{let t=await c(`/api/sessions/${e}`),i=document.getElementById(`panel-title`);i&&(i.textContent=`Panel: ${t.instructorName}`);let a=document.getElementById(`panel-program`);a&&(a.textContent=t.programName);let s=document.getElementById(`panel-group`);s&&(s.textContent=t.groupNumber);let l=document.getElementById(`panel-link`);l&&(l.textContent=t.shareUrl,l.href=t.shareUrl);let u=document.getElementById(`panel-status`);u&&(u.textContent=t.status,u.className=`badge ${t.isClosed?`closed`:`active`}`);let d=document.getElementById(`session-state`);d&&(d.textContent=t.status),r&&(r.disabled=!1),o&&(o.disabled=!1),n&&(n.disabled=!!t.isClosed);let f=document.getElementById(`total-participants`);f&&(f.textContent=t.students.length);let p=t.students.filter(e=>e.completed),m=document.getElementById(`completed-count-text`);m&&(m.textContent=`${p.length} completados (${t.students.length>0?Math.round(p.length/t.students.length*100):0}%)`);let h=p.length?Math.round(p.reduce((e,t)=>e+(t.visualPct||0),0)/p.length):0,v=p.length?Math.round(p.reduce((e,t)=>e+(t.auditoryPct||0),0)/p.length):0,y=p.length?Math.round(p.reduce((e,t)=>e+(t.kinestheticPct||0),0)/p.length):0,b=document.getElementById(`avg-visual`),x=document.getElementById(`avg-auditory`),S=document.getElementById(`avg-kinesthetic`);b&&(b.textContent=`${h}%`),x&&(x.textContent=`${v}%`),S&&(S.textContent=`${y}%`),g=t.students,_(g)}catch(e){a(t,e.message,`error`)}};d&&d.addEventListener(`input`,()=>{_(g)}),u&&u.addEventListener(`click`,async()=>{let e=document.getElementById(`panel-link`),t=e?e.href:``;if(t)try{await navigator.clipboard.writeText(t),i(`¡Enlace copiado al portapapeles!`,`success`)}catch{let e=document.createElement(`input`);e.value=t,document.body.appendChild(e),e.select(),document.execCommand(`copy`),document.body.removeChild(e),i(`¡Enlace copiado al portapapeles!`,`success`)}}),n&&n.addEventListener(`click`,async()=>{if(window.confirm(`¿Deseas cerrar la encuesta definitivamente?

Al cerrarla, ya no se aceptarán nuevos participantes y se habilitará la generación del reporte PDF.`))try{n.disabled=!0,await c(`/api/sessions/${e}/close`,{method:`POST`}),i(`La encuesta ha sido cerrada exitosamente.`,`success`),a(t,`La encuesta se encuentra cerrada. Ahora puedes exportar el reporte PDF.`,`success`),await v()}catch(e){n.disabled=!1,a(t,e.message,`error`),i(e.message,`error`)}});let y=document.getElementById(`reset-session-btn`);y&&y.addEventListener(`click`,async()=>{if(window.confirm(`¿Deseas reiniciar esta encuesta?

Se limpiarán todos los registros de los participantes y la encuesta quedará activa nuevamente para nuevas respuestas.`))try{y.disabled=!0,await c(`/api/sessions/${e}/reset`,{method:`POST`}),i(`La encuesta fue reiniciada y se encuentra activa.`,`success`),a(t,`La encuesta fue reiniciada correctamente.`,`success`),await v()}catch(e){i(e.message,`error`),a(t,e.message,`error`)}finally{y.disabled=!1}});let b=async()=>{r&&(r.disabled=!0,r.innerHTML=`<span>Generando PDF…</span>`);try{let t=await fetch(`/api/sessions/${e}/report`);if(!t.ok)throw Error(`No se pudo generar el documento PDF.`);let n=await t.blob(),r=window.URL.createObjectURL(n),a=document.createElement(`a`);a.href=r,a.download=`Reporte_VAK_${e}.pdf`,a.click(),window.URL.revokeObjectURL(r),i(`¡Reporte PDF descargado exitosamente!`,`success`)}catch(e){i(e.message,`error`)}finally{r&&(r.disabled=!1,r.innerHTML=`
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Descargar PDF</span>
        `)}};r&&r.addEventListener(`click`,b);let x=()=>{f&&h&&(h.src=`/api/sessions/${e}/report?preview=true`,f.classList.add(`open`),f.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`)},S=()=>{f&&h&&(f.classList.remove(`open`),f.setAttribute(`aria-hidden`,`true`),h.src=`about:blank`,document.body.style.overflow=``)};o&&o.addEventListener(`click`,x),p&&p.addEventListener(`click`,S),m&&m.addEventListener(`click`,b),f&&f.addEventListener(`click`,e=>{e.target===f&&S()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&f?.classList.contains(`open`)&&S()}),await v();let C=setInterval(v,2500);window.addEventListener(`beforeunload`,()=>clearInterval(C))}r===`instructor`&&document.getElementById(`session-form`)?.addEventListener(`submit`,u),r===`student`&&p(),r===`instructor-panel`&&m()}));export{t};