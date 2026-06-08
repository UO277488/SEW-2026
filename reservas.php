<?php
session_start();
require_once "php/Reservas.php";

try {
    $reservas = new Reservas();
} catch (Exception $e) {
    $error = "Error de conexión a la base de datos.";
}

$mensaje = "";
$presupuesto = null;

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($reservas)) {
    if (isset($_POST["action"])) {
        switch ($_POST["action"]) {
            case "registro":
                if ($reservas->registrarUsuario($_POST["nombre"], $_POST["email"], $_POST["telefono"], $_POST["password"])) {
                    $mensaje = "<p data-role='mensaje-exito'>Usuario registrado correctamente.</p>";
                } else {
                    $mensaje = "<p data-role='mensaje-error'>Error al registrar usuario.</p>";
                }
                break;
            case "login":
                $usuario = $reservas->autenticarUsuario($_POST["email"], $_POST["password"]);
                if ($usuario) {
                    $_SESSION["usuario_id"] = $usuario["usuario_id"];
                    $_SESSION["usuario_nombre"] = $usuario["nombre"];
                    $mensaje = "<p data-role='mensaje-exito'>Inicio de sesión correcto.</p>";
                } else {
                    $mensaje = "<p data-role='mensaje-error'>Email o contraseña incorrectos.</p>";
                }
                break;
            case "presupuesto":
                $presupuesto = $reservas->calcularPresupuesto($_POST["recurso_id"], $_POST["numero_personas"], $_POST["fecha_inicio"], $_POST["fecha_fin"]);
                break;
            case "reservar":
                if (isset($_SESSION["usuario_id"])) {
                    $reserva_id = $reservas->crearReserva($_SESSION["usuario_id"], $_POST["recurso_id"], $_POST["fecha_inicio"], $_POST["fecha_fin"], $_POST["numero_personas"], $_POST["precio_total"]);
                    if ($reserva_id) {
                        $mensaje = "<p data-role='mensaje-exito'>Reserva confirmada con ID: $reserva_id</p>";
                    } else {
                        $mensaje = "<p data-role='mensaje-error'>Error al crear la reserva.</p>";
                    }
                } else {
                    $mensaje = "<p data-role='mensaje-error'>Debes iniciar sesión para reservar.</p>";
                }
                break;
            case "anular":
                if (isset($_SESSION["usuario_id"])) {
                    if ($reservas->anularReserva($_POST["reserva_id"], $_SESSION["usuario_id"])) {
                        $mensaje = "<p data-role='mensaje-exito'>Reserva anulada correctamente.</p>";
                    } else {
                        $mensaje = "<p data-role='mensaje-error'>Error al anular la reserva.</p>";
                    }
                }
                break;
            case "logout":
                session_destroy();
                header("Location: reservas.php");
                exit;
                break;
        }
    }
}

$recursos = isset($reservas) ? $reservas->obtenerRecursos() : [];
$mis_reservas = isset($reservas) && isset($_SESSION["usuario_id"]) ? $reservas->obtenerReservasUsuario($_SESSION["usuario_id"]) : [];
?>
<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta charset="UTF-8" >
    <meta name="author" content="UO277488" >
    <meta name="description" content="Sistema de reservas de recursos turísticos de Santa Cruz de Tenerife" >
    <meta name="keywords" content="reservas, turismo, Tenerife, recursos" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <meta property="og:title" content="Reservas - Santa Cruz de Tenerife" >
    <meta property="og:description" content="Sistema de reservas de recursos turísticos de Santa Cruz de Tenerife" >
    <meta property="og:type" content="website" >
    <meta name="twitter:card" content="summary" >
    <title>Reservas - Santa Cruz de Tenerife</title>
    <link rel="icon" href="multimedia/favicon.svg" type="image/svg+xml" >
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" >
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" >
    <link rel="stylesheet" type="text/css" href="estilo/print.css" media="print" >
    <script src="js/reservas.js" defer></script>
</head>
<body>
    <header>
        <h1><a href="index.html" title="Volver a la página principal">Santa Cruz de Tenerife</a></h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="gastronomia.html">Gastronomía</a>
            <a href="rutas.html">Rutas</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="juego.html">Juego</a>
            <a href="reservas.php" class="activo" aria-current="page">Reservas</a>
            <a href="ayuda.html">Ayuda</a>
        </nav>
    </header>
    <main>
        <p><a href="index.html">Inicio</a> <strong>&gt;</strong> Reservas</p>

        <?php echo $mensaje; ?>

        <?php if (!isset($_SESSION["usuario_id"])): ?>
        <section>
            <h2>Iniciar sesión</h2>
            <form data-role="form-reserva" method="post" action="reservas.php">
                <input type="hidden" name="action" value="login" >
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required >
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required >
                <input type="submit" value="Iniciar sesión" >
            </form>
        </section>
        <section>
            <h2>Registro de nuevo usuario</h2>
            <form data-role="form-reserva" method="post" action="reservas.php">
                <input type="hidden" name="action" value="registro" >
                <label for="nombre">Nombre completo:</label>
                <input type="text" id="nombre" name="nombre" required >
                <label for="email_reg">Email:</label>
                <input type="email" id="email_reg" name="email" required >
                <label for="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" >
                <label for="password_reg">Contraseña:</label>
                <input type="password" id="password_reg" name="password" required >
                <input type="submit" value="Registrarse" >
            </form>
        </section>
        <?php else: ?>
        <section>
            <h2>Bienvenido, <?php echo htmlspecialchars($_SESSION["usuario_nombre"]); ?></h2>
            <form method="post" action="reservas.php">
                <input type="hidden" name="action" value="logout" >
                <input type="submit" value="Cerrar sesión" >
            </form>
        </section>

        <section>
            <h2>Recursos turísticos disponibles</h2>
            <?php if (count($recursos) > 0): ?>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Plazas</th>
                        <th scope="col">Ubicación</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recursos as $recurso): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($recurso['nombre']); ?></td>
                        <td><?php echo htmlspecialchars($recurso['tipo_nombre']); ?></td>
                        <td><?php echo number_format($recurso['precio'], 2); ?>€</td>
                        <td><?php echo $recurso['plazas']; ?></td>
                        <td><?php echo htmlspecialchars($recurso['ubicacion']); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php else: ?>
            <p>No hay recursos turísticos disponibles en este momento.</p>
            <?php endif; ?>
        </section>

        <section>
            <h2>Realizar una reserva</h2>
            <form data-role="form-reserva" method="post" action="reservas.php">
                <input type="hidden" name="action" value="presupuesto" >
                <label for="recurso_id">Recurso turístico:</label>
                <select id="recurso_id" name="recurso_id" required>
                    <option value="">Selecciona un recurso...</option>
                    <?php foreach ($recursos as $recurso): ?>
                    <option value="<?php echo $recurso['recurso_id']; ?>"><?php echo htmlspecialchars($recurso['nombre']); ?> - <?php echo number_format($recurso['precio'], 2); ?>€</option>
                    <?php endforeach; ?>
                </select>
                <label for="fecha_inicio">Fecha de inicio:</label>
                <input type="date" id="fecha_inicio" name="fecha_inicio" required >
                <label for="fecha_fin">Fecha de fin:</label>
                <input type="date" id="fecha_fin" name="fecha_fin" required >
                <label for="numero_personas">Número de personas:</label>
                <input type="number" id="numero_personas" name="numero_personas" min="1" max="20" required >
                <input type="submit" value="Calcular presupuesto" >
            </form>
        </section>

        <?php if ($presupuesto): ?>
        <section>
            <h2>Presupuesto</h2>
            <p><strong>Recurso:</strong> <?php echo htmlspecialchars($presupuesto['recurso']['nombre']); ?></p>
            <p><strong>Precio unitario:</strong> <?php echo number_format($presupuesto['precio_unitario'], 2); ?>€</p>
            <p><strong>Personas:</strong> <?php echo $presupuesto['numero_personas']; ?></p>
            <p><strong>Días:</strong> <?php echo $presupuesto['dias']; ?></p>
            <p><strong>Subtotal:</strong> <?php echo number_format($presupuesto['subtotal'], 2); ?>€</p>
            <form data-role="form-reserva" method="post" action="reservas.php">
                <input type="hidden" name="action" value="reservar" >
                <input type="hidden" name="recurso_id" value="<?php echo $presupuesto['recurso']['recurso_id']; ?>" >
                <input type="hidden" name="fecha_inicio" value="<?php echo htmlspecialchars($_POST['fecha_inicio']); ?>" >
                <input type="hidden" name="fecha_fin" value="<?php echo htmlspecialchars($_POST['fecha_fin']); ?>" >
                <input type="hidden" name="numero_personas" value="<?php echo $presupuesto['numero_personas']; ?>" >
                <input type="hidden" name="precio_total" value="<?php echo $presupuesto['subtotal']; ?>" >
                <input type="submit" value="Confirmar reserva" >
            </form>
        </section>
        <?php endif; ?>

        <section>
            <h2>Mis reservas</h2>
            <?php if (count($mis_reservas) > 0): ?>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Recurso</th>
                        <th scope="col">Ubicación</th>
                        <th scope="col">Fecha inicio</th>
                        <th scope="col">Fecha fin</th>
                        <th scope="col">Personas</th>
                        <th scope="col">Total</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($mis_reservas as $reserva): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($reserva['recurso_nombre']); ?></td>
                        <td><?php echo htmlspecialchars($reserva['ubicacion']); ?></td>
                        <td><?php echo $reserva['fecha_inicio']; ?></td>
                        <td><?php echo $reserva['fecha_fin']; ?></td>
                        <td><?php echo $reserva['numero_personas']; ?></td>
                        <td><?php echo number_format($reserva['precio_total'], 2); ?>€</td>
                        <td><?php echo $reserva['estado']; ?></td>
                        <td>
                            <?php if ($reserva['estado'] != 'cancelada'): ?>
                            <form method="post" action="reservas.php">
                                <input type="hidden" name="action" value="anular" >
                                <input type="hidden" name="reserva_id" value="<?php echo $reserva['reserva_id']; ?>" >
                                <input type="submit" value="Anular" >
                            </form>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php else: ?>
            <p>No tienes reservas realizadas.</p>
            <?php endif; ?>
        </section>
        <?php endif; ?>
    </main>
    <footer>
        <p>© 2026 UO277488 - Software y Estándares para la Web</p>
        <address>Contacto: <a href="mailto:uo277488@uniovi.es">uo277488@uniovi.es</a></address>
    </footer>
</body>
</html>
