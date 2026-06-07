<?php
session_start();
require_once "Configuracion.php";

$mensaje = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $config = new Configuracion();
        switch ($_POST["action"]) {
            case "reiniciar":
                $config->reiniciarBaseDatos();
                $mensaje = "Base de datos reiniciada correctamente.";
                break;
            case "eliminar":
                $config->eliminarBaseDatos();
                $mensaje = "Base de datos eliminada correctamente.";
                break;
            case "exportar":
                $csv = $config->exportarCSV();
                header("Content-Type: application/zip");
                header("Content-Disposition: attachment; filename=backup_" . date("Ymd_His") . ".zip");
                echo $csv;
                exit;
                break;
        }
    } catch (Exception $e) {
        $mensaje = "Error: " . $e->getMessage();
    }
}
?>
<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta charset="UTF-8" >
    <meta name="author" content="UO277488" >
    <meta name="description" content="Configuración de la base de datos de pruebas" >
    <meta name="keywords" content="configuración, base de datos, pruebas" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <meta property="og:title" content="Configuración - Pruebas de Usabilidad - Santa Cruz de Tenerife" >
    <meta property="og:description" content="Configuración de la base de datos de pruebas de usabilidad" >
    <meta property="og:type" content="website" >
    <meta name="twitter:card" content="summary" >
    <title>Configuración - Pruebas de Usabilidad</title>
    <link rel="icon" href="../multimedia/favicon.svg" type="image/svg+xml" >
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" >
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" >
    <link rel="stylesheet" type="text/css" href="../estilo/print.css" media="print" >
</head>
<body>
    <header>
        <h1><a href="../index.html">Santa Cruz de Tenerife</a></h1>
        <nav>
            <a href="../index.html">Inicio</a>
            <a href="../gastronomia.html">Gastronomía</a>
            <a href="../rutas.html">Rutas</a>
            <a href="../meteorologia.html">Meteorología</a>
            <a href="../juego.html">Juego</a>
            <a href="../reservas.php">Reservas</a>
            <a href="../ayuda.html">Ayuda</a>
        </nav>
    </header>
    <main>
        <p><a href="../index.html">Inicio</a> <strong>&gt;</strong> <a href="../juego.html">Juego</a> <strong>&gt;</strong> Configuración Test</p>
        <section>
            <h2>Configuración de la base de datos</h2>
            <?php if ($mensaje): ?>
            <p data-role="mensaje"><?php echo htmlspecialchars($mensaje); ?></p>
            <?php endif; ?>
            <form method="post" action="configuracion_ui.php">
                <input type="hidden" name="action" value="reiniciar" >
                <input type="submit" value="Reiniciar Base de Datos" >
            </form>
            <form method="post" action="configuracion_ui.php">
                <input type="hidden" name="action" value="eliminar" >
                <input type="submit" value="Eliminar Base de Datos" >
            </form>
            <form method="post" action="configuracion_ui.php">
                <input type="hidden" name="action" value="exportar" >
                <input type="submit" value="Exportar a CSV" >
            </form>
        </section>
    </main>
    <footer>
        <p>© 2026 UO277488 - Software y Estándares para la Web</p>
    </footer>
</body>
</html>
