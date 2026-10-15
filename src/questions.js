const QUESTIONS = [
  {
    number: 1,
    prompt: 'Cuando quiero recordar información nueva, me resulta más fácil:',
    options: {
      A: 'Escuchar la explicación del tema.',
      B: 'Ver un esquema o una imagen del tema.',
      C: 'Aplicarlo de inmediato en una práctica.'
    }
  },
  {
    number: 2,
    prompt: 'Si voy a aprender a usar una herramienta nueva, primero:',
    options: {
      A: 'Leo el manual o miro una demostración visual.',
      B: 'Escucho la explicación de alguien.',
      C: 'La pruebo yo mismo para entenderla.'
    }
  },
  {
    number: 3,
    prompt: 'Cuando necesito estudiar para un examen, prefiero:',
    options: {
      A: 'Repasar con alguien que me explique.',
      B: 'Consultar diagramas, mapas o apuntes visuales.',
      C: 'Hacer ejercicios y practicar.'
    }
  },
  {
    number: 4,
    prompt: 'En una clase, me concentro mejor cuando:',
    options: {
      A: 'Puedo moverme o participar activamente.',
      B: 'Escucho atentamente la explicación.',
      C: 'Veo ejemplos visuales en la pizarra o pantalla.'
    }
  },
  {
    number: 5,
    prompt: 'Para comprender un concepto difícil, me ayuda más:',
    options: {
      A: 'Probarlo con un ejercicio práctico.',
      B: 'Escuchar la explicación con calma.',
      C: 'Mirar gráficos o representaciones visuales.'
    }
  },
  {
    number: 6,
    prompt: 'Cuando alguien explica algo, yo suelo recordar mejor:',
    options: {
      A: 'Lo que escucho con atención.',
      B: 'Las palabras y ejemplos que veo.',
      C: 'La experiencia o la acción que se realiza.'
    }
  },
  {
    number: 7,
    prompt: 'Si quiero aprender una canción nueva, prefiero:',
    options: {
      A: 'Escucharla varias veces.',
      B: 'Ver la partitura o una representación visual.',
      C: 'Cantarla o repetirla con movimiento.'
    }
  },
  {
    number: 8,
    prompt: 'Me siento más motivado cuando:',
    options: {
      A: 'Puedo discutir y escuchar a otros.',
      B: 'Veo un ejemplo claro o un video.',
      C: 'Participo haciendo algo con mis manos.'
    }
  },
  {
    number: 9,
    prompt: 'Cuando me explican un procedimiento, prefiero:',
    options: {
      A: 'Seguir el paso a paso con acciones concretas.',
      B: 'Escuchar la explicación verbal.',
      C: 'Ver una imagen o esquema del procedimiento.'
    }
  },
  {
    number: 10,
    prompt: 'Para recordar información, me sirve más:',
    options: {
      A: 'Asociarla con una imagen o color.',
      B: 'Repetirla en voz alta o explicársela a otra persona.',
      C: 'Relacionarla con una experiencia física y práctica.'
    }
  },
  {
    number: 11,
    prompt: 'Al resolver un problema, normalmente:',
    options: {
      A: 'Lo analizo con una explicación verbal.',
      B: 'Lo visualizo con un esquema o dibujo.',
      C: 'Lo pruebo directamente y ajusto el proceso.'
    }
  },
  {
    number: 12,
    prompt: 'Cuando me enseñan algo nuevo, me gusta:',
    options: {
      A: 'Ver cómo lo hacen en una demostración.',
      B: 'Escuchar la explicación detenidamente.',
      C: 'Ponerlo en práctica yo mismo.'
    }
  },
  {
    number: 13,
    prompt: 'Me distraigo menos cuando:',
    options: {
      A: 'Hay movimiento o actividad en el entorno.',
      B: 'Puedo mirar gráficos o ilustraciones.',
      C: 'Escucho la explicación con claridad.'
    }
  },
  {
    number: 14,
    prompt: 'Para aprender mejor, necesito:',
    options: {
      A: 'Ver ejemplos y detalles visuales.',
      B: 'Hablar y escuchar sobre el tema.',
      C: 'Hacerlo y sentir la experiencia.'
    }
  },
  {
    number: 15,
    prompt: 'Cuando alguien me da instrucciones, yo prefiero:',
    options: {
      A: 'Escuchar bien antes de actuar.',
      B: 'Verlas escritas o en un gráfico.',
      C: 'Ponermelas en práctica de inmediato.'
    }
  },
  {
    number: 16,
    prompt: 'Para estudiar, normalmente:',
    options: {
      A: 'Leo y reviso información visual.',
      B: 'Escucho grabaciones o explicaciones.',
      C: 'Realizo actividades prácticas.'
    }
  },
  {
    number: 17,
    prompt: 'Cuando me enfrento a un tema nuevo, mi primera reacción es:',
    options: {
      A: 'Moverme y probar distintas formas.',
      B: 'Escuchar una explicación.',
      C: 'Mirar ejemplos visuales.'
    }
  },
  {
    number: 18,
    prompt: 'Para recordar mejor una receta o procedimiento, me ayuda:',
    options: {
      A: 'Seguirla con los pasos y practicarla.',
      B: 'Escucharla mientras la explican.',
      C: 'Ver una imagen o un diagrama del proceso.'
    }
  },
  {
    number: 19,
    prompt: 'Cuando quiero comunicarme con claridad, prefiero:',
    options: {
      A: 'Explicar con palabras y ejemplos.',
      B: 'Usar gráficos o maquetas.',
      C: 'Demostrarlo con acciones o dinámicas.'
    }
  },
  {
    number: 20,
    prompt: 'En un taller o capacitación, me siento más cómodo cuando:',
    options: {
      A: 'Puedo observar o ver ejemplos.',
      B: 'Escucho instrucciones y luego pregunto.',
      C: 'Participo activamente en la práctica.'
    }
  },
  {
    number: 21,
    prompt: 'Cuando aprendo una nueva habilidad, prefiero:',
    options: {
      A: 'Ver a otra persona hacerlo y repetirlo.',
      B: 'Escuchar una explicación detallada.',
      C: 'Experimentar con movimiento y práctica.'
    }
  },
  {
    number: 22,
    prompt: 'Si debo preparar una presentación, me resulta mejor:',
    options: {
      A: 'Hacerla con movimiento, ejemplos o demostración práctica.',
      B: 'Explicar con palabras claras y pausas.',
      C: 'Usar gráficos, imágenes o diapositivas.'
    }
  },
  {
    number: 23,
    prompt: 'Para aprender a seguir instrucciones, me ayuda más:',
    options: {
      A: 'Verlas en un formato visual.',
      B: 'Escuchar la explicación oral.',
      C: 'Realizar el trabajo directamente.'
    }
  },
  {
    number: 24,
    prompt: 'Cuando alguien me da una idea, la entiendo mejor si:',
    options: {
      A: 'La escucho con atención.',
      B: 'La veo representada en un gráfico.',
      C: 'La pongo en práctica.'
    }
  },
  {
    number: 25,
    prompt: 'Cuando estudio, prefiero:',
    options: {
      A: 'Revisar textos, apuntes y material visual.',
      B: 'Escuchar explicaciones o grabaciones.',
      C: 'Resolver ejercicios y aplicar conceptos.'
    }
  },
  {
    number: 26,
    prompt: 'Para recordar datos importantes, me sirve más:',
    options: {
      A: 'Relacionarlos con una experiencia física.',
      B: 'Escribirlos o mirarlos en un esquema.',
      C: 'Escucharlos y repetírlos en voz alta.'
    }
  },
  {
    number: 27,
    prompt: 'Cuando tengo que aprender algo complejo, normalmente:',
    options: {
      A: 'Puedo escucharlo y repetirlo.',
      B: 'Lo convierto en un esquema o mapa mental.',
      C: 'Lo practico con ejemplos reales.'
    }
  },
  {
    number: 28,
    prompt: 'En una reunión o clase, tengo más facilidad para aprender cuando:',
    options: {
      A: 'Puedo moverme o participar activamente.',
      B: 'Veo la información escrita o visual.',
      C: 'Escucho la explicación.'
    }
  },
  {
    number: 29,
    prompt: 'Cuando doy una respuesta o resuelvo algo, normalmente:',
    options: {
      A: 'Lo explico verbalmente.',
      B: 'Lo visualizo en un esquema.',
      C: 'Lo hago con una demostración práctica.'
    }
  },
  {
    number: 30,
    prompt: 'Cuando necesito retener información, me ayuda más:',
    options: {
      A: 'Hacerlo con movimientos o acciones.',
      B: 'Mirar gráficos o mapas.',
      C: 'Escuchar la explicación.'
    }
  },
  {
    number: 31,
    prompt: 'En una actividad de aprendizaje, me siento más seguro cuando:',
    options: {
      A: 'Puedo escuchar la explicación con atención.',
      B: 'Veo claramente la información visual.',
      C: 'Lo realizo de forma práctica.'
    }
  },
  {
    number: 32,
    prompt: 'Si necesito recordar una secuencia, me resulta mejor:',
    options: {
      A: 'Hacer la actividad física y repetirla.',
      B: 'Mirar cómo se hace o seguir un esquema.',
      C: 'Escuchar la instrucción y repetirla.'
    }
  },
  {
    number: 33,
    prompt: 'Cuando me muestran una recomendación, prefiero:',
    options: {
      A: 'Escucharla y luego aplicarla.',
      B: 'Ver el ejemplo y la demostración.',
      C: 'Ejecutarla con práctica real.'
    }
  },
  {
    number: 34,
    prompt: 'Para recordar mejor un contenido, normalmente:',
    options: {
      A: 'Lo escucho y lo repito verbalmente.',
      B: 'Lo organizo en diagramas o cuadros.',
      C: 'Lo practico en situaciones concretas.'
    }
  },
  {
    number: 35,
    prompt: 'Cuando tengo que aprender algo en grupo, prefiero:',
    options: {
      A: 'Discutirlo y escuchar ideas.',
      B: 'Ver cómo lo expresan visualmente.',
      C: 'Participar y hacer una actividad práctica.'
    }
  },
  {
    number: 36,
    prompt: 'Cuando conozco una nueva idea, la entiendo mejor si:',
    options: {
      A: 'La observo en un ejemplo visual.',
      B: 'La escucho y la comparo con otras ideas.',
      C: 'La pongo en práctica de inmediato.'
    }
  },
  {
    number: 37,
    prompt: 'Para captar mejor un contenido, me ayuda más:',
    options: {
      A: 'Escuchar y explicar en voz alta.',
      B: 'Ver material gráfico o la pizarra.',
      C: 'Realizar una actividad y experimentar.'
    }
  },
  {
    number: 38,
    prompt: 'En una clase, me siento más presente si:',
    options: {
      A: 'Puedo participar con movimiento y práctica.',
      B: 'Mirando gráficos o notas.',
      C: 'Escuchando la explicación.'
    }
  },
  {
    number: 39,
    prompt: 'Cuando estudio, mi mejor estrategia es:',
    options: {
      A: 'Discutir y escuchar a otros.',
      B: 'Verlo y resumirlo en imágenes.',
      C: 'Hacer ejercicios y actividades prácticas.'
    }
  },
  {
    number: 40,
    prompt: 'Para aprender algo complejo, prefiero:',
    options: {
      A: 'Escuchar la explicación de alguien.',
      B: 'Ver representaciones y resúmenes visuales.',
      C: 'Demostrarlo con práctica y experiencia.'
    }
  }
];

module.exports = { QUESTIONS };
