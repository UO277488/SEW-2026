<?php
session_start();
require_once "Configuracion.php";

$mensaje = "";
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["guardar"])) {
    try {
        $config = new Configuracion("UO277488_TestDB");
        $conexion = $config->getConexion();
        $stmt = $conexion->prepare("INSERT INTO usuario (profession, age, gender, computer_expertise) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("siss", $_POST["profession"], $_POST["age"], $_POST["gender"], $_POST["computer_expertise"]);
        $stmt->execute();
        $user_id = $stmt->insert_id;

        $tiempo = $_POST["tiempo"];
        $stmt2 = $conexion->prepare("INSERT INTO resultado (user_id, responses, time, completed, comments, proposals, assessment) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt2->bind_param("issssss", $user_id, $_POST["responses"], $tiempo, $_POST["completed"], $_POST["comments"], $_POST["proposals"], $_POST["assessment"]);
        $stmt2->execute();

        $mensaje = "Prueba de usabilidad guardada correctamente.";
    } catch (Exception $e) {
        $mensaje = "Error: " . $e->getMessage();
    }
}
?>
<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="UO277488" />
    <meta name="description" content="Prueba de usabilidad del proyecto" />
    <meta name="keywords" content="usabilidad, prueba, test" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="Prueba de Usabilidad - Santa Cruz de Tenerife" >
    <meta property="og:description" content="Prueba de usabilidad del proyecto turístico de Santa Cruz de Tenerife" >
    <meta property="og:type" content="website" >
    <meta name="twitter:card" content="summary" >
    <title>Prueba de Usabilidad</title>
    <link rel="icon" href="../multimedia/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/print.css" media="print" />
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
        <p><a href="../index.html">Inicio</a> <strong>&gt;</strong> <a href="../juego.html">Juego</a> <strong>&gt;</strong> Test</p>
        <section>
            <h2>Prueba de Usabilidad</h2>
            <?php if ($mensaje): ?>
            <p><?php echo htmlspecialchars($mensaje); ?></p>
            <?php endif; ?>
            <form method="post" action="test_usability.php" id="form-test">
                <fieldset>
                    <legend>Datos del usuario</legend>
                    <label for="profession">Profesión:</label>
                    <input type="text" id="profession" name="profession" required />
                    <label for="age">Edad:</label>
                    <input type="number" id="age" name="age" min="1" max="120" required />
                    <label for="gender">Género:</label>
                    <select id="gender" name="gender">
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                        <option value="otro">Otro</option>
                    </select>
                    <label for="computer_expertise">Nivel de destreza en ordenador (0-10):</label>
                    <input type="number" id="computer_expertise" name="computer_expertise" min="0" max="10" required />
                    <label for="device">Dispositivo utilizado:</label>
                    <select id="device" name="device">
                        <option value="ordenador">Ordenador</option>
                        <option value="tableta">Tableta</option>
                        <option value="movil">Móvil</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Preguntas de la prueba</legend>
                    <p><strong>TAREA 1:</strong> Jugar al juego desarrollado.</p>
                    <p><strong>TAREA 2:</strong> Encontrar información sobre el tiempo de duración de una ruta turística.</p>
                    <p><strong>TAREA 3:</strong> Hacer una reserva de actividades turísticas durante una semana y obtener el presupuesto.</p>
                    <label for="responses">Respuestas del usuario:</label>
                    <textarea id="responses" name="responses" rows="6"></textarea>
                    <label for="completed">¿Completó todas las tareas?</label>
                    <select id="completed" name="completed">
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Comentarios del observador</legend>
                    <label for="comments">Comentarios:</label>
                    <textarea id="comments" name="comments" rows="4"></textarea>
                    <label for="proposals">Propuestas de mejora:</label>
                    <textarea id="proposals" name="proposals" rows="4"></textarea>
                    <label for="assessment">Valoración general:</label>
                    <select id="assessment" name="assessment">
                        <option value="muy_bien">Muy bien</option>
                        <option value="bien">Bien</option>
                        <option value="regular">Regular</option>
                        <option value="mal">Mal</option>
                    </select>
                </fieldset>
                <input type="hidden" name="tiempo" id="tiempo" value="0" />
                <p>
                    <button type="button" id="iniciar">Iniciar Prueba</button>
                    <button type="button" id="terminar">Terminar Prueba</button>
                </p>
                <p id="cronometro">00:00.0</p>
                <input type="submit" name="guardar" value="Guardar resultados" />
            </form>
        </section>
    </main>
    <footer>
        <p>© 2026 UO277488 - Software y Estándares para la Web</p>
    </footer>
    <script>
        (function() {
            var inicio = 0;
            var intervalo = null;
            var cronometro = document.getElementById("cronometro");
            var tiempoInput = document.getElementById("tiempo");

            document.getElementById("iniciar").addEventListener("click", function() {
                inicio = Date.now();
                intervalo = setInterval(function() {
                    var ahora = Date.now();
                    var diff = new Date(ahora - inicio);
                    var minutos = diff.getMinutes().toString().padStart(2, "0");
                    var segundos = diff.getSeconds().toString().padStart(2, "0");
                    var decimas = Math.floor(diff.getMilliseconds() / 100);
                    cronometro.textContent = minutos + ":" + segundos + "." + decimas;
                }, 100);
            });

            document.getElementById("terminar").addEventListener("click", function() {
                if (intervalo) {
                    clearInterval(intervalo);
                    intervalo = null;
                }
                var ahora = Date.now();
                var diff = Math.floor((ahora - inicio) / 1000);
                tiempoInput.value = diff;
            });
        })();
    </script>
</body>
</html>
