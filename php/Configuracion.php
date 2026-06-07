<?php
class Configuracion {
    private $conexion;

    public function __construct($baseDatos = "UO277488_DB") {
        $this->conexion = new mysqli("localhost", "DBUSER2026", "DBPWD2026", $baseDatos);
        if ($this->conexion->connect_error) {
            throw new Exception("Error de conexión: " . $this->conexion->connect_error);
        }
        $this->conexion->set_charset("utf8mb4");
    }

    public function getConexion() {
        return $this->conexion;
    }

    public function reiniciarBaseDatos() {
        $this->conexion->query("SET FOREIGN_KEY_CHECKS = 0");
        $tables = $this->conexion->query("SHOW TABLES");
        while ($row = $tables->fetch_array()) {
            $this->conexion->query("TRUNCATE TABLE " . $row[0]);
        }
        $this->conexion->query("SET FOREIGN_KEY_CHECKS = 1");
        return true;
    }

    public function eliminarBaseDatos() {
        $this->conexion->query("DROP DATABASE IF EXISTS UO277488_DB");
        return true;
    }

    public function exportarCSV() {
        $zip = new ZipArchive();
        $filename = tempnam(sys_get_temp_dir(), "csv_") . ".zip";
        if ($zip->open($filename, ZipArchive::CREATE) !== TRUE) {
            return false;
        }

        $tables = $this->conexion->query("SHOW TABLES");
        while ($row = $tables->fetch_array()) {
            $table = $row[0];
            $result = $this->conexion->query("SELECT * FROM $table");
            $csv = "";
            $fields = $result->fetch_fields();
            $headers = [];
            foreach ($fields as $field) {
                $headers[] = $field->name;
            }
            $csv .= implode(";", $headers) . "\n";

            while ($row_data = $result->fetch_assoc()) {
                $line = [];
                foreach ($headers as $header) {
                    $value = $row_data[$header] ?? "";
                    $line[] = str_replace('"', '""', $value);
                }
                $csv .= implode(";", $line) . "\n";
            }

            $zip->addFromString($table . ".csv", $csv);
        }

        $zip->close();
        $content = file_get_contents($filename);
        unlink($filename);
        return $content;
    }

    public function __destruct() {
        if ($this->conexion) {
            $this->conexion->close();
        }
    }
}
