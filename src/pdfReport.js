const PDFDocument = require('pdfkit');
const { CATEGORY_LABELS } = require('./logic');

/**
 * Format a date string in Spanish format
 */
function formatDate(date) {
  const d = date ? new Date(date) : new Date();
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Calculate group statistics from student list
 */
function calculateGroupStats(students = []) {
  const total = students.length;
  const completed = students.filter(s => s.completed);
  const completedCount = completed.length;
  const completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  if (completedCount === 0) {
    return {
      total,
      completedCount,
      completionRate,
      avgVisual: 0,
      avgAuditory: 0,
      avgKinesthetic: 0,
      dominantStyle: 'Sin datos',
      styleCounts: { visual: 0, auditory: 0, kinesthetic: 0, multimodal: 0 },
      recommendation: 'Aún no se han registrado respuestas para generar recomendaciones pedagógicas.'
    };
  }

  const sumVisual = completed.reduce((acc, s) => acc + (s.visualPct || 0), 0);
  const sumAuditory = completed.reduce((acc, s) => acc + (s.auditoryPct || 0), 0);
  const sumKinesthetic = completed.reduce((acc, s) => acc + (s.kinestheticPct || 0), 0);

  const avgVisual = Number((sumVisual / completedCount).toFixed(1));
  const avgAuditory = Number((sumAuditory / completedCount).toFixed(1));
  const avgKinesthetic = Number((sumKinesthetic / completedCount).toFixed(1));

  const styleCounts = { visual: 0, auditory: 0, kinesthetic: 0, multimodal: 0 };

  completed.forEach(s => {
    const styles = Array.isArray(s.predominantStyles) ? s.predominantStyles : [];
    if (styles.length === 1) {
      const key = styles[0];
      if (styleCounts[key] !== undefined) {
        styleCounts[key]++;
      }
    } else if (styles.length > 1) {
      styleCounts.multimodal++;
    }
  });

  // Determine dominant style
  let dominantStyle = 'Balanceado / Multimodal';
  let maxCount = styleCounts.multimodal;

  if (styleCounts.visual > maxCount) {
    dominantStyle = 'Visual';
    maxCount = styleCounts.visual;
  }
  if (styleCounts.auditory > maxCount) {
    dominantStyle = 'Auditivo';
    maxCount = styleCounts.auditory;
  }
  if (styleCounts.kinesthetic > maxCount) {
    dominantStyle = 'Cinestésico';
    maxCount = styleCounts.kinesthetic;
  }

  // Pedagogical suggestions based on dominant style
  let recommendation = '';
  if (dominantStyle === 'Visual') {
    recommendation = 'El grupo aprende mejor mediante diagramas, mapas conceptuales, presentaciones visuales, colores y esquemas estructurados.';
  } else if (dominantStyle === 'Auditivo') {
    recommendation = 'Se recomienda priorizar explicaciones orales, debates guiados, exposiciones, preguntas socráticas y resúmenes verbalizados.';
  } else if (dominantStyle === 'Cinestésico') {
    recommendation = 'Se sugiere enfatizar talleres prácticos, dinámicas activas, simulaciones, estudio de casos reales y actividades donde manipulen herramientas.';
  } else {
    recommendation = 'Grupo heterogéneo y multimodal: se recomienda una metodología combinada que integre recursos visuales, explicaciones orales y ejercicios prácticos.';
  }

  return {
    total,
    completedCount,
    completionRate,
    avgVisual,
    avgAuditory,
    avgKinesthetic,
    dominantStyle,
    styleCounts,
    recommendation
  };
}

/**
 * Translate predominant styles to clean Spanish labels
 */
function formatPredominantLabel(styles) {
  if (!styles || !Array.isArray(styles) || styles.length === 0) {
    return 'Sin resultado';
  }
  const translated = styles.map(s => {
    if (CATEGORY_LABELS[s]) return CATEGORY_LABELS[s];
    // Capitalize fallback
    return s.charAt(0).toUpperCase() + s.slice(1);
  });
  return translated.join(' / ');
}

/**
 * Render the full editorial PDF report body into a PDFKit document
 * @param {PDFDocument} doc - PDFDocument instance
 * @param {Object} session - Session object with students
 */
function renderReportContent(doc, session) {
  const stats = calculateGroupStats(session.students || []);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - (margin * 2); // 523.28 pt

  // ==========================================
  // 1. HEADER SECTION
  // ==========================================
  // Header background container
  const headerHeight = 78;
  doc.roundedRect(margin, margin, contentWidth, headerHeight, 10)
     .fillAndStroke('#0F172A', '#1E293B');

  // Decorative accent line
  doc.rect(margin + 12, margin + 12, 4, headerHeight - 24)
     .fill('#3B82F6');

  // Eyebrow badge
  doc.fillColor('#93C5FD')
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text('MODELO VAK • DIAGNÓSTICO PSICOPEDAGÓGICO', margin + 26, margin + 15, {
       characterSpacing: 0.8
     });

  // Main Title
  doc.fillColor('#FFFFFF')
     .font('Helvetica-Bold')
     .fontSize(16)
     .text('Reporte Ejecutivo de Estilos de Aprendizaje', margin + 26, margin + 29);

  // Subtitle
  doc.fillColor('#94A3B8')
     .font('Helvetica')
     .fontSize(9.5)
     .text('Evaluación diagnóstica de canales de percepción: Visual, Auditivo y Cinestésico', margin + 26, margin + 50);

  // Status Pill on top right
  const pillWidth = 72;
  const pillHeight = 22;
  const pillX = margin + contentWidth - pillWidth - 14;
  const pillY = margin + 14;
  const isClosed = Boolean(session.isClosed);
  const pillBg = isClosed ? '#1E293B' : '#064E3B';
  const pillText = isClosed ? 'Cerrada' : 'Activa';
  const pillColor = isClosed ? '#CBD5E1' : '#34D399';

  doc.roundedRect(pillX, pillY, pillWidth, pillHeight, 11)
     .fill(pillBg);
  doc.fillColor(pillColor)
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text(pillText, pillX, pillY + 5.5, { width: pillWidth, align: 'center' });

  // ==========================================
  // 2. SESSION METADATA GRID
  // ==========================================
  let currentY = margin + headerHeight + 12;
  const metaHeight = 56;

  doc.roundedRect(margin, currentY, contentWidth, metaHeight, 8)
     .fillAndStroke('#F8FAFC', '#E2E8F0');

  const metaColWidth = contentWidth / 4;
  const metaItems = [
    { label: 'INSTRUCTOR', val: session.instructorName || 'No especificado' },
    { label: 'PROGRAMA', val: session.programName || 'No especificado' },
    { label: 'GRUPO / FICHA', val: session.groupNumber || 'No especificado' },
    { label: 'FECHA EMISIÓN', val: formatDate(new Date()) }
  ];

  metaItems.forEach((item, index) => {
    const colX = margin + (index * metaColWidth) + 12;
    doc.fillColor('#64748B')
       .font('Helvetica-Bold')
       .fontSize(7.5)
       .text(item.label, colX, currentY + 11, { width: metaColWidth - 16 });

    doc.fillColor('#0F172A')
       .font('Helvetica-Bold')
       .fontSize(9.5)
       .text(item.val, colX, currentY + 26, {
         width: metaColWidth - 16,
         ellipsis: true
       });
  });

  currentY += metaHeight + 12;

  // ==========================================
  // 3. EXECUTIVE KPI CARDS (4 CARDS)
  // ==========================================
  const kpiCount = 4;
  const kpiGap = 8;
  const kpiWidth = (contentWidth - ((kpiCount - 1) * kpiGap)) / kpiCount;
  const kpiHeight = 58;

  const kpis = [
    {
      title: 'TOTAL EVALUADOS',
      value: `${stats.completedCount} / ${stats.total}`,
      sub: `${stats.completionRate}% completados`,
      color: '#475569',
      border: '#CBD5E1',
      bg: '#F8FAFC'
    },
    {
      title: 'PROMEDIO VISUAL',
      value: `${stats.avgVisual}%`,
      sub: `${stats.styleCounts.visual} alumnos dominantes`,
      color: '#1D4ED8',
      border: '#BFDBFE',
      bg: '#EFF6FF'
    },
    {
      title: 'PROMEDIO AUDITIVO',
      value: `${stats.avgAuditory}%`,
      sub: `${stats.styleCounts.auditory} alumnos dominantes`,
      color: '#047857',
      border: '#A7F3D0',
      bg: '#ECFDF5'
    },
    {
      title: 'PROMEDIO CINESTÉSICO',
      value: `${stats.avgKinesthetic}%`,
      sub: `${stats.styleCounts.kinesthetic} alumnos dominantes`,
      color: '#B45309',
      border: '#FDE68A',
      bg: '#FFFBEB'
    }
  ];

  kpis.forEach((kpi, idx) => {
    const x = margin + (idx * (kpiWidth + kpiGap));
    doc.roundedRect(x, currentY, kpiWidth, kpiHeight, 6)
       .fillAndStroke(kpi.bg, kpi.border);

    doc.fillColor('#64748B')
       .font('Helvetica-Bold')
       .fontSize(7)
       .text(kpi.title, x + 8, currentY + 8, { width: kpiWidth - 16 });

    doc.fillColor(kpi.color)
       .font('Helvetica-Bold')
       .fontSize(14)
       .text(kpi.value, x + 8, currentY + 21, { width: kpiWidth - 16 });

    doc.fillColor('#64748B')
       .font('Helvetica')
       .fontSize(7.5)
       .text(kpi.sub, x + 8, currentY + 41, { width: kpiWidth - 16 });
  });

  currentY += kpiHeight + 10;

  // ==========================================
  // 4. PEDAGOGICAL INSIGHT BANNER
  // ==========================================
  const insightHeight = 36;
  doc.roundedRect(margin, currentY, contentWidth, insightHeight, 6)
     .fillAndStroke('#F1F5F9', '#E2E8F0');

  doc.rect(margin, currentY, 4, insightHeight)
     .fill('#6366F1');

  doc.fillColor('#4338CA')
     .font('Helvetica-Bold')
     .fontSize(8)
     .text(`ORIENTACIÓN PEDAGÓGICA (Predominancia Grupal: ${stats.dominantStyle}):`, margin + 12, currentY + 7);

  doc.fillColor('#334155')
     .font('Helvetica')
     .fontSize(8)
     .text(stats.recommendation, margin + 12, currentY + 19, {
       width: contentWidth - 24,
       ellipsis: true
     });

  currentY += insightHeight + 14;

  // ==========================================
  // 5. STUDENT RESULTS TABLE
  // ==========================================
  const columns = [
    { key: 'idx', label: '#', width: 26, align: 'center' },
    { key: 'name', label: 'Estudiante', width: 175, align: 'left' },
    { key: 'visual', label: 'Visual', width: 62, align: 'center' },
    { key: 'auditory', label: 'Auditivo', width: 62, align: 'center' },
    { key: 'kinesthetic', label: 'Cinestésico', width: 66, align: 'center' },
    { key: 'predominant', label: 'Estilo Dominante', width: 88, align: 'center' },
    { key: 'status', label: 'Estado', width: 44, align: 'center' }
  ];

  function drawTableHeader(y) {
    const headerRowHeight = 22;
    doc.roundedRect(margin, y, contentWidth, headerRowHeight, 4)
       .fill('#1E293B');

    let x = margin;
    columns.forEach(col => {
      doc.fillColor('#FFFFFF')
         .font('Helvetica-Bold')
         .fontSize(8)
         .text(col.label, x + (col.align === 'left' ? 6 : 0), y + 6.5, {
           width: col.width - (col.align === 'left' ? 6 : 0),
           align: col.align
         });
      x += col.width;
    });

    return y + headerRowHeight;
  }

  // Section title before table
  doc.fillColor('#0F172A')
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('Detalle Individual de Evaluaciones', margin, currentY);

  doc.fillColor('#64748B')
     .font('Helvetica')
     .fontSize(8.5)
     .text(`Listado oficial de estudiantes y ponderaciones individuales del test (40 reactivos).`, margin, currentY + 14);

  currentY += 28;
  currentY = drawTableHeader(currentY);

  const students = session.students || [];

  if (students.length === 0) {
    // Empty state
    const emptyHeight = 44;
    doc.rect(margin, currentY, contentWidth, emptyHeight)
       .fillAndStroke('#FFFFFF', '#E2E8F0');
    doc.fillColor('#64748B')
       .font('Helvetica')
       .fontSize(9)
       .text('No hay participantes registrados en esta sesión hasta el momento.', margin, currentY + 16, {
         width: contentWidth,
         align: 'center'
       });
    currentY += emptyHeight;
  } else {
    const rowHeight = 21;
    const maxY = pageHeight - margin - 40; // reserve space for footer

    students.forEach((student, index) => {
      // Check page break
      if (currentY + rowHeight > maxY) {
        doc.addPage();
        currentY = margin + 10;
        // Reprint mini header banner on subsequent pages
        doc.fillColor('#64748B')
           .font('Helvetica')
           .fontSize(8)
           .text(`Continuación de resultados: ${session.programName} • Grupo ${session.groupNumber}`, margin, currentY);
        currentY += 14;
        currentY = drawTableHeader(currentY);
      }

      // Zebra background
      const isEven = index % 2 === 0;
      doc.rect(margin, currentY, contentWidth, rowHeight)
         .fill(isEven ? '#FFFFFF' : '#F8FAFC');

      // Bottom subtle border
      doc.moveTo(margin, currentY + rowHeight)
         .lineTo(margin + contentWidth, currentY + rowHeight)
         .strokeColor('#E2E8F0')
         .lineWidth(0.5)
         .stroke();

      const isComp = Boolean(student.completed);
      const predominantLabel = isComp ? formatPredominantLabel(student.predominantStyles) : 'Pendiente';

      let x = margin;
      columns.forEach(col => {
        let cellText = '';
        let cellColor = '#0F172A';
        let cellFont = 'Helvetica';

        if (col.key === 'idx') {
          cellText = String(index + 1);
          cellColor = '#64748B';
        } else if (col.key === 'name') {
          cellText = student.name;
          cellFont = 'Helvetica-Bold';
        } else if (col.key === 'visual') {
          cellText = isComp ? `${student.visualPct ?? 0}%` : '-';
          cellColor = isComp ? '#1E40AF' : '#94A3B8';
        } else if (col.key === 'auditory') {
          cellText = isComp ? `${student.auditoryPct ?? 0}%` : '-';
          cellColor = isComp ? '#065F46' : '#94A3B8';
        } else if (col.key === 'kinesthetic') {
          cellText = isComp ? `${student.kinestheticPct ?? 0}%` : '-';
          cellColor = isComp ? '#92400E' : '#94A3B8';
        } else if (col.key === 'predominant') {
          cellText = predominantLabel;
          cellFont = 'Helvetica-Bold';
          if (!isComp) cellColor = '#94A3B8';
          else if (student.predominantStyles?.includes('visual')) cellColor = '#1D4ED8';
          else if (student.predominantStyles?.includes('auditory')) cellColor = '#047857';
          else if (student.predominantStyles?.includes('kinesthetic')) cellColor = '#B45309';
          else cellColor = '#6B21A8';
        } else if (col.key === 'status') {
          cellText = isComp ? 'OK' : 'Pend.';
          cellColor = isComp ? '#047857' : '#D97706';
          cellFont = 'Helvetica-Bold';
        }

        doc.fillColor(cellColor)
           .font(cellFont)
           .fontSize(8)
           .text(cellText, x + (col.align === 'left' ? 6 : 0), currentY + 5.5, {
             width: col.width - (col.align === 'left' ? 6 : 0),
             align: col.align,
             ellipsis: true
           });

        x += col.width;
      });

      currentY += rowHeight;
    });
  }

  // ==========================================
  // 6. TWO-PASS FOOTER (ALL PAGES)
  // ==========================================
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    // Prevent PDFKit from auto-triggering a page break when writing near bottom
    doc.page.margins.bottom = 0;

    const footerY = pageHeight - 26;

    // Divider line
    doc.moveTo(margin, footerY - 6)
       .lineTo(margin + contentWidth, footerY - 6)
       .strokeColor('#E2E8F0')
       .lineWidth(0.5)
       .stroke();

    // Footer Left Notice
    doc.fillColor('#94A3B8')
       .font('Helvetica')
       .fontSize(7.5)
       .text('Documento oficial generado por la Plataforma VAK • Evaluación de Canales de Aprendizaje', margin, footerY, {
         width: contentWidth * 0.7,
         lineBreak: false
       });

    // Footer Right Page Count
    const pageStr = `Página ${i + 1} de ${range.count}`;
    doc.fillColor('#64748B')
       .font('Helvetica-Bold')
       .fontSize(8)
       .text(pageStr, margin + (contentWidth * 0.7), footerY, {
         width: contentWidth * 0.3,
         align: 'right',
         lineBreak: false
       });
  }
}

/**
 * Generate report piped to an output writable stream (Express response)
 */
function generateSessionReport(session, res) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 36, bottom: 44, left: 36, right: 36 },
    bufferPages: true,
    info: {
      Title: `Reporte VAK - ${session?.programName || ''} - Grupo ${session?.groupNumber || ''}`,
      Author: session?.instructorName || 'Instructor',
      Subject: 'Reporte de Estilos de Aprendizaje (Modelo VAK)',
      Keywords: 'VAK, Estilos de Aprendizaje, Evaluación, Educación',
      CreationDate: new Date()
    }
  });

  doc.pipe(res);
  ensureStandardFonts(doc);
  renderReportContent(doc, session || {});
  doc.end();
}

/**
 * Generate full report as a Buffer promise (ideal for Vercel Serverless Functions)
 */
function generateSessionReportBuffer(session) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 36, bottom: 44, left: 36, right: 36 },
        bufferPages: true,
        info: {
          Title: `Reporte VAK - ${session?.programName || ''} - Grupo ${session?.groupNumber || ''}`,
          Author: session?.instructorName || 'Instructor',
          Subject: 'Reporte de Estilos de Aprendizaje (Modelo VAK)',
          Keywords: 'VAK, Estilos de Aprendizaje, Evaluación, Educación',
          CreationDate: new Date()
        }
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      ensureStandardFonts(doc);
      renderReportContent(doc, session || {});
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  generateSessionReport,
  generateSessionReportBuffer,
  calculateGroupStats,
  formatPredominantLabel
};
