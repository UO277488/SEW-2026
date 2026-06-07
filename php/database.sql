CREATE DATABASE IF NOT EXISTS UO277488_DB;
USE UO277488_DB;

CREATE USER IF NOT EXISTS 'DBUSER2026'@'localhost' IDENTIFIED BY 'DBPWD2026';
GRANT ALL PRIVILEGES ON UO277488_DB.* TO 'DBUSER2026'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tipo_recurso (
    tipo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE recurso_turistico (
    recurso_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo_id INT NOT NULL,
    plazas INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    ubicacion VARCHAR(255),
    FOREIGN KEY (tipo_id) REFERENCES tipo_recurso(tipo_id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE reserva (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    recurso_id INT NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    numero_personas INT NOT NULL DEFAULT 1,
    precio_total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (recurso_id) REFERENCES recurso_turistico(recurso_id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE presupuesto (
    presupuesto_id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    numero_personas INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reserva(reserva_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tipo_recurso (nombre, descripcion) VALUES
('Ruta guiada', 'Recorrido turístico con guía especializado'),
('Museo', 'Visita a museos y centros culturales'),
('Restaurante', 'Experiencia gastronómica tradicional canaria'),
('Hotel', 'Alojamiento turístico'),
('Actividad acuática', 'Deportes y actividades en el mar');

INSERT INTO recurso_turistico (nombre, descripcion, tipo_id, plazas, precio, fecha_inicio, fecha_fin, ubicacion) VALUES
('Ruta guiada al Teide', 'Ascenso guiado al Parque Nacional del Teide con transporte incluido', 1, 15, 45.00, '2026-06-15 08:00:00', '2026-12-15 18:00:00', 'Parque Nacional del Teide'),
('Museo de la Naturaleza y el Hombre', 'Visita al museo de ciencias naturales de Tenerife', 2, 50, 8.00, '2026-01-01 09:00:00', '2026-12-31 19:00:00', 'Santa Cruz de Tenerife'),
('Cena tradicional canaria', 'Cena con degustación de platos típicos canarios', 3, 30, 35.00, '2026-01-01 20:00:00', '2026-12-31 23:00:00', 'La Laguna'),
('Hotel Rural Anaga', 'Alojamiento en el Parque Rural de Anaga con desayuno incluido', 4, 20, 85.00, '2026-01-01 12:00:00', '2026-12-31 12:00:00', 'Parque Rural de Anaga'),
('Avistamiento de cetáceos', 'Excursión en barco para avistar ballenas y delfines', 5, 25, 40.00, '2026-01-01 09:00:00', '2026-12-31 17:00:00', 'Los Gigantes');
