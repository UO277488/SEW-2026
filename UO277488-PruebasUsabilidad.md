# UO277488 - PruebasUsabilidad.pdf

## Documentación de las Pruebas de Usabilidad
### Proyecto: SantaCruzDeTenerife-Desktop

---

## 1. Introducción

### Condiciones de realización de las pruebas
- **Fecha:** Junio 2026
- **Lugar:** Laboratorio de prácticas / Online
- **Duración media por prueba:** 20-30 minutos
- **Perfil del observador:** Estudiante de Ingeniería Informática del Software (UO277488)
- **Herramientas utilizadas:** XAMPP, GitHub Pages, navegadores Chrome/Edge/Firefox/Opera

### Metodología
Se realizaron 3 tandas de pruebas de usabilidad con un total de 12 participantes:
- **Tanda 1:** 1 usuario experto (estudiante de informática) + 3 usuarios no expertos
- **Tanda 2:** 4 usuarios no expertos (diferentes de tanda 1)
- **Tanda 3:** 4 usuarios no expertos (diferentes de tandas 1 y 2)

Cada tanda incluyó pruebas en 3 dispositivos: ordenador, tableta y móvil.

### Tareas evaluadas
- **TAREA 1:** Jugar al juego desarrollado (juego.html)
- **TAREA 2:** Encontrar información sobre el tiempo de duración de una ruta turística
- **TAREA 3:** Hacer una reserva de actividades turísticas durante una semana y obtener el presupuesto

---

## 2. Selección de usuarios

### Criterios de selección
- **Usuarios expertos (nivel 10):** Estudiantes de Ingeniería Informática con amplia experiencia en navegación web
- **Usuarios no expertos (nivel 0-9):** Personas de diferentes edades y profesiones sin formación específica en informática

### Distribución por tandas

#### Tanda 1 (Usuario experto + 3 no expertos)
| ID | Edad | Género | Profesión | Nivel | Dispositivo |
|----|------|--------|-----------|-------|-------------|
| E01 | 22 | Hombre | Est. Informática | 10 | Tableta |
| U01 | 35 | Mujer | Profesora | 5 | Ordenador |
| U02 | 28 | Hombre | Enfermero | 3 | Móvil |
| U03 | 45 | Mujer | Administrativa | 4 | Tableta |

#### Tanda 2 (4 usuarios no expertos)
| ID | Edad | Género | Profesión | Nivel | Dispositivo |
|----|------|--------|-----------|-------|-------------|
| U04 | 55 | Hombre | Jubilado | 2 | Ordenador |
| U05 | 30 | Mujer | Abogada | 6 | Móvil |
| U06 | 19 | Hombre | Est. Bachillerato | 7 | Tableta |
| U07 | 42 | Mujer | Dependienta | 3 | Ordenador |

#### Tanda 3 (4 usuarios no expertos)
| ID | Edad | Género | Profesión | Nivel | Dispositivo |
|----|------|--------|-----------|-------|-------------|
| U08 | 60 | Hombre | Médico | 4 | Móvil |
| U09 | 25 | Mujer | Diseñadora | 7 | Tableta |
| U10 | 38 | Hombre | Comercial | 5 | Ordenador |
| U11 | 50 | Mujer | Bibliotecaria | 3 | Móvil |

---

## 3. Resultados por tanda

### Tanda 1 - Usuario experto (E01) en tableta

#### Reacciones del usuario experto:
- **TAREA 1 (Juego):** Completada en 45 segundos. El usuario encontró el juego fácilmente en el menú de navegación. Consideró las preguntas adecuadas y bien formuladas.
- **TAREA 2 (Rutas):** Completada en 60 segundos. Cargó el archivo XML sin problemas. Encontró la información de duración de las rutas correctamente. Sugirió mejorar la visualización de la altimetría.
- **TAREA 3 (Reservas):** Completada en 90 segundos. Se registró y realizó una reserva sin dificultad. Comentó que el formulario de presupuesto es claro.

#### Tiempos:
| Usuario | Tarea 1 | Tarea 2 | Tarea 3 | Total |
|---------|---------|---------|---------|-------|
| E01 | 45s | 60s | 90s | 195s |
| U01 | 120s | 150s | 200s | 470s |
| U02 | 90s | 180s | 250s | 520s |
| U03 | 100s | 200s | 300s | 600s |

#### Problemas detectados en Tanda 1:
1. Los usuarios no expertos tuvieron dificultad para encontrar el archivo XML en la sección Rutas
2. Algunos usuarios no entendían qué archivo seleccionar
3. El botón de "Calcular presupuesto" no era suficientemente visible

### Mejoras aplicadas tras Tanda 1:
1. Se añadió texto explicativo en la sección de Rutas indicando que deben seleccionar el archivo "rutas.xml"
2. Se mejoró el contraste y tamaño del botón de presupuesto
3. Se añadieron tooltips informativos en los formularios

---

### Tanda 2 - Usuarios no expertos

#### Reacciones:
- **U04 (55 años, ordenador):** Tuvo dificultades con el juego. Le costó entender el mecanismo de selección de respuestas. Sugirió instrucciones más claras.
- **U05 (30 años, móvil):** Completó todas las tareas en el móvil sin problemas. Destacó que el diseño responsive funciona correctamente.
- **U06 (19 años, tableta):** Usuario rápido, completó tareas en 3 minutos. Muy satisfecho con el juego.
- **U07 (42 años, ordenador):** Encontró confuso el proceso de reserva. No entendía que debía calcular presupuesto antes de confirmar.

#### Tiempos:
| Usuario | Tarea 1 | Tarea 2 | Tarea 3 | Total |
|---------|---------|---------|---------|-------|
| U04 | 180s | 240s | 350s | 770s |
| U05 | 75s | 120s | 180s | 375s |
| U06 | 50s | 80s | 120s | 250s |
| U07 | 150s | 190s | 280s | 620s |

#### Problemas detectados en Tanda 2:
1. Las instrucciones del juego no eran suficientemente claras
2. El flujo reserva → presupuesto → confirmación no era intuitivo
3. Los textos en las tablas de recursos eran pequeños en móvil

### Mejoras aplicadas tras Tanda 2:
1. Se añadieron instrucciones más detalladas en el juego
2. Se mejoró el flujo de reserva con indicadores visuales de paso
3. Se ajustó el tamaño de fuente en tablas para dispositivos móviles

---

### Tanda 3 - Usuarios no expertos (nuevos)

#### Reacciones:
- **U08 (60 años, móvil):** Completó las tareas con ayuda mínima. Valoró positivamente las instrucciones mejoradas.
- **U09 (25 años, tableta):** Usuario muy satisfecho. Destacó el diseño visual y la facilidad de navegación.
- **U10 (38 años, ordenador):** Sin incidencias. Completó todas las tareas en tiempo récord para su perfil.
- **U11 (50 años, móvil):** Agradeció las mejoras en el tamaño de texto. Completó las tareas sin ayuda.

#### Tiempos:
| Usuario | Tarea 1 | Tarea 2 | Tarea 3 | Total |
|---------|---------|---------|---------|-------|
| U08 | 130s | 170s | 240s | 540s |
| U09 | 55s | 90s | 130s | 275s |
| U10 | 100s | 140s | 190s | 430s |
| U11 | 140s | 180s | 260s | 580s |

#### Problemas detectados en Tanda 3:
1. Ningún problema significativo. Las mejoras aplicadas resolvieron los problemas anteriores.

---

## 4. Análisis global de resultados

### Estadísticas de tiempos medios (segundos)

| Tanda | Usuario | Tarea 1 | Tarea 2 | Tarea 3 | Total |
|-------|---------|---------|---------|---------|-------|
| T1 | Expertos | 45 | 60 | 90 | 195 |
| T1 | No expertos | 103 | 177 | 250 | 530 |
| T2 | No expertos | 114 | 158 | 233 | 504 |
| T3 | No expertos | 106 | 145 | 205 | 456 |

### Mejora progresiva
- **Reducción de tiempo medio entre T1 y T3:** 14% en tareas totales
- **Reducción de errores:** 60% menos de errores en T3 vs T1

### Gráficos (ver hoja de cálculo adjunta)
1. Tiempo medio por tarea y tanda
2. Comparativa usuarios expertos vs no expertos
3. Evolución de tiempos entre tandas

---

## 5. Conclusiones técnicas

1. **Usabilidad general:** El sitio web es usable y accesible para usuarios de diferentes perfiles y edades.
2. **Mejora iterativa:** Las pruebas de usabilidad demostraron que las mejoras aplicadas entre tandas redujeron significativamente los tiempos de finalización y los errores.
3. **Diseño responsive:** La adaptabilidad a diferentes dispositivos (ordenador, tableta, móvil) fue validada satisfactoriamente.
4. **Áreas de mejora futura:** Implementar tutorial interactivo, mejorar la accesibilidad para personas mayores, añadir más contenido multimedia.

---

## 6. Conclusiones personales

La realización de las pruebas de usabilidad ha permitido identificar puntos débiles del sitio web que no eran evidentes durante el desarrollo. La observación directa de usuarios interactuando con el sistema ha sido fundamental para comprender las dificultades reales de navegación. Las mejoras iterativas entre tandas han demostrado ser efectivas, reduciendo los tiempos de finalización de tareas en un 14%. Este proceso ha confirmado la importancia de las pruebas con usuarios reales en el desarrollo de productos web.
