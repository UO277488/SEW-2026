# UO277488 - DatosPruebasUsabilidad

## Hoja de cálculo con datos de pruebas de usabilidad

---

### Hoja 1: Datos de Usuarios

| ID_Tanda | ID_Usuario | Edad | Género  | Profesión                 | Nivel_Destreza | Dispositivo |
|----------|------------|------|---------|---------------------------|----------------|-------------|
| 1        | E01        | 22   | Hombre  | Est. Informática          | 10             | Tableta     |
| 1        | U01        | 35   | Mujer   | Profesora                 | 5              | Ordenador   |
| 1        | U02        | 28   | Hombre  | Enfermero                 | 3              | Móvil       |
| 1        | U03        | 45   | Mujer   | Administrativa            | 4              | Tableta     |
| 2        | U04        | 55   | Hombre  | Jubilado                  | 2              | Ordenador   |
| 2        | U05        | 30   | Mujer   | Abogada                   | 6              | Móvil       |
| 2        | U06        | 19   | Hombre  | Est. Bachillerato         | 7              | Tableta     |
| 2        | U07        | 42   | Mujer   | Dependienta               | 3              | Ordenador   |
| 3        | U08        | 60   | Hombre  | Médico                    | 4              | Móvil       |
| 3        | U09        | 25   | Mujer   | Diseñadora                | 7              | Tableta     |
| 3        | U10        | 38   | Hombre  | Comercial                 | 5              | Ordenador   |
| 3        | U11        | 50   | Mujer   | Bibliotecaria             | 3              | Móvil       |

### Hoja 2: Tiempos por Tarea (segundos)

| ID_Tanda | ID_Usuario | Tarea1 | Tarea2 | Tarea3 | Total | Completado |
|----------|------------|--------|--------|--------|-------|------------|
| 1        | E01        | 45     | 60     | 90     | 195   | Sí         |
| 1        | U01        | 120    | 150    | 200    | 470   | Sí         |
| 1        | U02        | 90     | 180    | 250    | 520   | Sí         |
| 1        | U03        | 100    | 200    | 300    | 600   | Sí         |
| 2        | U04        | 180    | 240    | 350    | 770   | Sí         |
| 2        | U05        | 75     | 120    | 180    | 375   | Sí         |
| 2        | U06        | 50     | 80     | 120    | 250   | Sí         |
| 2        | U07        | 150    | 190    | 280    | 620   | Sí         |
| 3        | U08        | 130    | 170    | 240    | 540   | Sí         |
| 3        | U09        | 55     | 90     | 130    | 275   | Sí         |
| 3        | U10        | 100    | 140    | 190    | 430   | Sí         |
| 3        | U11        | 140    | 180    | 260    | 580   | Sí         |

### Hoja 3: Estadísticas por Tanda

| Tanda | Tarea1_Media | Tarea2_Media | Tarea3_Media | Total_Medio | Mejora(%) |
|-------|--------------|--------------|--------------|-------------|-----------|
| 1     | 89           | 148          | 210          | 446         | -         |
| 2     | 114          | 158          | 233          | 504         | -13%      |
| 3     | 106          | 145          | 205          | 456         | +10%      |

### Hoja 4: Gráficos (Descripción)

**Gráfico 1: Tiempo medio por tarea y tanda**
- Barras agrupadas mostrando Tarea1, Tarea2, Tarea3 para cada tanda
- Eje X: Tandas (1, 2, 3)
- Eje Y: Tiempo medio (segundos)

**Gráfico 2: Comparativa usuario experto vs no expertos**
- Líneas mostrando la evolución del tiempo total
- Usuario experto: línea plana en ~195s
- Usuarios no expertos: línea descendente de 530s a 456s

**Gráfico 3: Distribución de tiempos por dispositivo**
- Barras: Ordenador (~530s), Tableta (~340s), Móvil (~475s)
- Muestra que tableta tiene mejores tiempos por el público más joven

### Hoja 5: Valoraciones y Comentarios

| ID_Usuario | Valoración     | Comentarios del observador                                     |
|------------|----------------|----------------------------------------------------------------|
| E01        | Muy bien       | Sin incidencias. Usuario experto, tiempos mínimos.             |
| U01        | Bien           | Dificultad inicial con carga de archivo XML                     |
| U02        | Bien           | Problemas de visualización en móvil con tablas                  |
| U03        | Regular        | Confusión con flujo de reserva                                  |
| U04        | Regular        | Dificultad con el juego, instrucciones poco claras              |
| U05        | Bien           | Sin problemas destacables                                       |
| U06        | Muy bien       | Usuario rápido, satisfecho con el diseño                        |
| U07        | Bien           | Flujo de reserva confuso, requiere mejora                       |
| U08        | Bien           | Mejoras en instrucciones del juego funcionaron                  |
| U09        | Muy bien       | Muy satisfecho, diseño atractivo                                |
| U10        | Bien           | Sin incidencias                                                 |
| U11        | Bien           | Agradeció el tamaño de texto mejorado                           |
