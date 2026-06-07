<?php
class Reservas {
    private $conexion;

    public function __construct() {
        $this->conexion = new mysqli("localhost", "DBUSER2026", "DBPWD2026", "UO277488_DB");
        if ($this->conexion->connect_error) {
            throw new Exception("Error de conexión: " . $this->conexion->connect_error);
        }
        $this->conexion->set_charset("utf8mb4");
    }

    public function registrarUsuario($nombre, $email, $telefono, $password) {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->conexion->prepare("INSERT INTO usuario (nombre, email, telefono, password_hash) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nombre, $email, $telefono, $password_hash);
        return $stmt->execute();
    }

    public function autenticarUsuario($email, $password) {
        $stmt = $this->conexion->prepare("SELECT usuario_id, nombre, password_hash FROM usuario WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($usuario = $resultado->fetch_assoc()) {
            if (password_verify($password, $usuario['password_hash'])) {
                return $usuario;
            }
        }
        return false;
    }

    public function obtenerRecursos() {
        $resultado = $this->conexion->query("SELECT r.*, t.nombre as tipo_nombre FROM recurso_turistico r JOIN tipo_recurso t ON r.tipo_id = t.tipo_id ORDER BY r.nombre");
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function obtenerRecurso($recurso_id) {
        $stmt = $this->conexion->prepare("SELECT r.*, t.nombre as tipo_nombre FROM recurso_turistico r JOIN tipo_recurso t ON r.tipo_id = t.tipo_id WHERE r.recurso_id = ?");
        $stmt->bind_param("i", $recurso_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function calcularPresupuesto($recurso_id, $numero_personas, $fecha_inicio, $fecha_fin) {
        $recurso = $this->obtenerRecurso($recurso_id);
        if (!$recurso) return false;

        $inicio = new DateTime($fecha_inicio);
        $fin = new DateTime($fecha_fin);
        $dias = $inicio->diff($fin)->days + 1;

        $precio_unitario = $recurso['precio'];
        $subtotal = $precio_unitario * $numero_personas * $dias;

        return [
            'recurso' => $recurso,
            'precio_unitario' => $precio_unitario,
            'numero_personas' => $numero_personas,
            'dias' => $dias,
            'subtotal' => $subtotal
        ];
    }

    public function crearReserva($usuario_id, $recurso_id, $fecha_inicio, $fecha_fin, $numero_personas, $precio_total) {
        $stmt = $this->conexion->prepare("INSERT INTO reserva (usuario_id, recurso_id, fecha_inicio, fecha_fin, numero_personas, precio_total, estado) VALUES (?, ?, ?, ?, ?, ?, 'confirmada')");
        $stmt->bind_param("iissid", $usuario_id, $recurso_id, $fecha_inicio, $fecha_fin, $numero_personas, $precio_total);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        }
        return false;
    }

    public function obtenerReservasUsuario($usuario_id) {
        $stmt = $this->conexion->prepare("SELECT res.*, rec.nombre as recurso_nombre, rec.ubicacion FROM reserva res JOIN recurso_turistico rec ON res.recurso_id = rec.recurso_id WHERE res.usuario_id = ? ORDER BY res.fecha_reserva DESC");
        $stmt->bind_param("i", $usuario_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function anularReserva($reserva_id, $usuario_id) {
        $stmt = $this->conexion->prepare("UPDATE reserva SET estado = 'cancelada' WHERE reserva_id = ? AND usuario_id = ?");
        $stmt->bind_param("ii", $reserva_id, $usuario_id);
        return $stmt->execute();
    }

    public function __destruct() {
        if ($this->conexion) {
            $this->conexion->close();
        }
    }
}
