-- ============================================
-- Seed: Datos de Pruebas de Usabilidad
-- Proyecto: SantaCruzDeTenerife-Desktop
-- Autor: UO277488
-- Fecha: Junio 2026
-- ============================================
-- Este script es autocontenido: crea la BD,
-- las tablas y los inserta los datos.
-- ============================================

CREATE DATABASE IF NOT EXISTS UO277488_TestDB
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE UO277488_TestDB;

CREATE TABLE IF NOT EXISTS usuario (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    profession VARCHAR(100),
    age INT,
    gender VARCHAR(20),
    computer_expertise INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS resultado (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    responses TEXT,
    time VARCHAR(20),
    completed VARCHAR(5),
    comments TEXT,
    proposals TEXT,
    assessment VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS observacion (
    observation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    comments TEXT,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 1. USUARIOS (12 participantes, 3 tandas)
-- ============================================
INSERT INTO usuario (user_id, profession, age, gender, computer_expertise) VALUES
(1,  'Est. Informatica',    22, 'hombre', 10),
(2,  'Profesora',           35, 'mujer',   5),
(3,  'Enfermero',           28, 'hombre',   3),
(4,  'Administrativa',      45, 'mujer',    4),
(5,  'Jubilado',            55, 'hombre',   2),
(6,  'Abogada',             30, 'mujer',    6),
(7,  'Est. Bachillerato',   19, 'hombre',   7),
(8,  'Dependienta',         42, 'mujer',    3),
(9,  'Medico',              60, 'hombre',   4),
(10, 'Disenadora',          25, 'mujer',    7),
(11, 'Comercial',           38, 'hombre',   5),
(12, 'Bibliotecaria',       50, 'mujer',    3);

-- ============================================
-- 2. RESULTADOS por tarea
-- ============================================
INSERT INTO resultado (user_id, responses, time, completed, comments, proposals, assessment) VALUES
(1,
 'TAREA 1 (Juego): 45s. Encontro el juego facilmente. Preguntas adecuadas. '
 'TAREA 2 (Rutas): 60s. Cargo XML sin problemas. Sugirio mejorar altimetria. '
 'TAREA 3 (Reservas): 90s. Se registro y reservo sin dificultad.',
 '195', 'si',
 'Sin incidencias. Usuario experto, tiempos minimos.',
 'Mejorar la visualizacion de la altimetria de las rutas.',
 'muy_bien'),

(2,
 'TAREA 1: 120s. Dificultad inicial con XML. '
 'TAREA 2: 150s. No entendia que archivo seleccionar. '
 'TAREA 3: 200s. Boton de calcular presupuesto poco visible.',
 '470', 'si',
 'Dificultad inicial con carga de XML. Boton de presupuesto no era visible.',
 'Anadir texto explicativo indicando seleccionar rutas.xml. Mejorar contraste y tamano del boton.',
 'bien'),

(3,
 'TAREA 1: 90s. Problemas de visualizacion en movil con tablas. '
 'TAREA 2: 180s. '
 'TAREA 3: 250s.',
 '520', 'si',
 'Problemas de visualizacion en movil con tablas.',
 'Ajustar tablas para dispositivos moviles.',
 'bien'),

(4,
 'TAREA 1: 100s. '
 'TAREA 2: 200s. Confusion con flujo de reserva. '
 'TAREA 3: 300s. No entendia calcular presupuesto antes de confirmar.',
 '600', 'si',
 'Confusion con flujo de reserva.',
 'Mejorar el flujo de reserva con indicadores visuales de paso.',
 'regular'),

(5,
 'TAREA 1: 180s. Dificultad con el juego. No entendia seleccion. '
 'TAREA 2: 240s. '
 'TAREA 3: 350s.',
 '770', 'si',
 'Dificultad con el juego, instrucciones poco claras.',
 'Anadir instrucciones mas detalladas en el juego.',
 'regular'),

(6,
 'TAREA 1: 75s. '
 'TAREA 2: 120s. Diseno responsive funciona en movil. '
 'TAREA 3: 180s.',
 '375', 'si',
 'Sin problemas destacables.',
 'Ninguna.',
 'bien'),

(7,
 'TAREA 1: 50s. Usuario rapido, muy satisfecho. '
 'TAREA 2: 80s. '
 'TAREA 3: 120s.',
 '250', 'si',
 'Usuario rapido, satisfecho con el diseno.',
 'Ninguna.',
 'muy_bien'),

(8,
 'TAREA 1: 150s. '
 'TAREA 2: 190s. Flujo de reserva confuso. '
 'TAREA 3: 280s. No entendia reserva a presupuesto a confirmacion.',
 '620', 'si',
 'Flujo de reserva confuso, requiere mejora.',
 'Mejorar el flujo de reserva con indicadores visuales de paso.',
 'bien'),

(9,
 'TAREA 1: 130s. Valoro positivamente las instrucciones mejoradas. '
 'TAREA 2: 170s. '
 'TAREA 3: 240s.',
 '540', 'si',
 'Mejoras en instrucciones del juego funcionaron.',
 'Ninguna.',
 'bien'),

(10,
 'TAREA 1: 55s. Muy satisfecho con el diseno visual. '
 'TAREA 2: 90s. '
 'TAREA 3: 130s.',
 '275', 'si',
 'Muy satisfecho, diseno atractivo.',
 'Ninguna.',
 'muy_bien'),

(11,
 'TAREA 1: 100s. Sin incidencias. '
 'TAREA 2: 140s. '
 'TAREA 3: 190s.',
 '430', 'si',
 'Sin incidencias.',
 'Ninguna.',
 'bien'),

(12,
 'TAREA 1: 140s. Agradecio mejoras en tamano de texto. '
 'TAREA 2: 180s. '
 'TAREA 3: 260s.',
 '580', 'si',
 'Agradecio el tamano de texto mejorado.',
 'Ninguna.',
 'bien');

-- ============================================
-- 3. OBSERVACIONES
-- ============================================
INSERT INTO observacion (user_id, comments) VALUES
(1,  'Tanda 1 - EXPERTO: Sin incidencias. Dispositivo: tableta.'),
(2,  'Tanda 1 - NO EXPERTO: Dificultad inicial con XML. Dispositivo: ordenador.'),
(3,  'Tanda 1 - NO EXPERTO: Problemas visualizacion tablas en movil. Dispositivo: movil.'),
(4,  'Tanda 1 - NO EXPERTO: Confusion flujo de reserva. Dispositivo: tableta.'),
(5,  'Tanda 2 - NO EXPERTO: Dificultad con juego. Dispositivo: ordenador.'),
(6,  'Tanda 2 - NO EXPERTO: Sin problemas. Dispositivo: movil.'),
(7,  'Tanda 2 - NO EXPERTO: Usuario rapido. Dispositivo: tableta.'),
(8,  'Tanda 2 - NO EXPERTO: Flujo de reserva confuso. Dispositivo: ordenador.'),
(9,  'Tanda 3 - NO EXPERTO: Instrucciones mejoradas funcionaron. Dispositivo: movil.'),
(10, 'Tanda 3 - NO EXPERTO: Muy satisfecho. Dispositivo: tableta.'),
(11, 'Tanda 3 - NO EXPERTO: Sin incidencias. Dispositivo: ordenador.'),
(12, 'Tanda 3 - NO EXPERTO: Agradecio tamano de texto. Dispositivo: movil.');

-- Verificacion
SELECT CONCAT('Usuarios: ', COUNT(*)) FROM usuario
UNION ALL
SELECT CONCAT('Resultados: ', COUNT(*)) FROM resultado
UNION ALL
SELECT CONCAT('Observaciones: ', COUNT(*)) FROM observacion;
