CREATE DATABASE IF NOT EXISTS UO277488_TestDB;
USE UO277488_TestDB;

CREATE USER IF NOT EXISTS 'DBUSER2026'@'localhost' IDENTIFIED BY 'DBPWD2026';
GRANT ALL PRIVILEGES ON UO277488_TestDB.* TO 'DBUSER2026'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE usuario (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    profession VARCHAR(100),
    age INT,
    gender VARCHAR(20),
    computer_expertise INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE resultado (
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

CREATE TABLE observacion (
    observation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    comments TEXT,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
