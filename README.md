# Santa Cruz de Tenerife - Portal Turístico

Proyecto de la asignatura **Software y Estándares para la Web** (SEW) - Curso 2025-2026.

**Autor:** UO277488  
**Repositorio:** https://github.com/UO277488/SEW-2026  
---

## Descripción

Portal turístico de la provincia de Santa Cruz de Tenerife con información sobre gastronomía, rutas, meteorología, reservas y un juego de preguntas.

## Tecnologías utilizadas

| Tecnología | Versión |
|---|---|
| HTML5 | W3C válido |
| CSS3 | W3C válido |
| JavaScript (ES6+) | jQuery 3.7.1 |
| PHP | 8.2 |
| MariaDB / MySQL | 10.4+ |
| XML | DTD + XSD + SVG + KML |
| Leaflet | 1.9.4 (mapas interactivos) |
| Open-Meteo API | Datos meteorológicos |
| NewsData.io API | Noticias sobre Tenerife |

## Estructura del proyecto

```
├── index.html              # Página principal con carrusel y noticias
├── gastronomia.html        # Gastronomía típica (imágenes, vídeo, audio)
├── rutas.html              # Rutas turísticas (carga XML, mapa Leaflet)
├── meteorologia.html       # Meteorología en tiempo real (Open-Meteo)
├── juego.html              # Juego de preguntas tipo test
├── reservas.php            # Sistema de reservas con PHP + BD
├── ayuda.html              # Ayuda y documentación del sitio
├── README.md               # Este archivo
│
├── estilo/
│   ├── estilo.css          # Estilos generales
│   ├── layout.css          # Layout responsive (flexbox/grid)
│   └── print.css           # Estilos de impresión
│
├── js/
│   ├── carrusel.js         # Carrusel de imágenes
│   ├── ciudad.js           # Meteorología (Open-Meteo)
│   ├── juego.js            # Lógica del juego de preguntas
│   ├── noticias.js         # Noticias (NewsData.io)
│   └── rutas.js            # Carga de XML + mapa Leaflet
│
├── php/
│   ├── Configuracion.php   # Clase de conexión a BD
│   ├── configuracion_ui.php # UI de configuración de BD
│   ├── Reservas.php         # Clase de gestión de reservas
│   ├── database.sql         # Esquema BD principal (UO277488_DB)
│   ├── test_data_seed.sql   # BD de pruebas de usabilidad (UO277488_TestDB)
│   ├── recurso_turistico.csv
│   └── tipo_recurso.csv
│
├── xml/
│   ├── rutas.xml            # Datos de rutas turísticas
│   ├── rutas.dtd            # Definición DTD
│   ├── rutas.xsd            # Esquema XSD
│   ├── xml2kml.py           # Conversor XML → KML
│   ├── xml2svg.py           # Conversor XML → SVG
│   ├── altimetria_ruta*.svg # Perfiles de altitud
│   └── planimetria_ruta*.kml # Datos geoespaciales
│
├── multimedia/              # Imágenes, vídeos, audio, subtítulos
│
├── UO277488-PruebasUsabilidad.md
├── UO277488-PruebasDespliegue.md
└── UO277488-DatosPruebasUsabilidad.md
```

## Requisitos del servidor

- Apache 2.4+ con mod_php
- PHP 8.2+ (extensiones: mysqli, xml, mbstring)
- MariaDB 10.4+ o MySQL 8+
- XAMPP (entorno de desarrollo recomendado)

## Configuración de la base de datos

### Base de datos principal (reservas)

Ejecutar en orden:

```bash
mysql -u root -p < php/database.sql
```

**Credenciales**

| Parámetro | Valor |
|---|---|
| Usuario BD | `DBUSER2026` |
| Contraseña | `DBPWD2026` |
| Base de datos | `UO277488_DB` |
| Host | `localhost` |

### Base de datos de pruebas de usabilidad

```bash
mysql -u root -p < php/test_data_seed.sql
```

**Credenciales**

| Parámetro | Valor |
|---|---|
| Usuario BD | `DBUSER2026` |
| Contraseña | `DBPWD2026` |
| Base de datos | `UO277488_TestDB` |
| Host | `localhost` |

## API Keys

| Servicio | Clave |
|---|---|
| NewsData.io | `pub_1b2135cb947a4939b50ff0a92d91b3e2` |

## Despliegue

### Local (XAMPP)

1. Copiar el proyecto a `C:\xampp\htdocs\SantaCruzDeTenerife-Desktop\`
2. Iniciar Apache y MySQL desde el panel de XAMPP
3. Importar `php/database.sql` desde phpMyAdmin
4. Acceder a `http://localhost/SantaCruzDeTenerife-Desktop/`

### Nube (Azure)

Seguir `UO277488-PruebasDespliegue.md` para desplegar en una VM de Azure con Ubuntu Server 24.04 LTS.

## Funcionalidades

- **Carrusel** de imágenes turísticas con cambio automático cada 3s
- **Noticias** en tiempo real sobre Tenerife (NewsData.io)
- **Gastronomía** con imágenes responsive, vídeo con subtítulos y audio
- **Rutas** con carga de XML, mapa Leaflet interactivo y perfiles de altitud SVG
- **Meteorología** en tiempo real y previsión 7 días (Open-Meteo)
- **Juego** de 10 preguntas tipo test sobre el contenido del sitio
- **Reservas** con registro de usuarios, presupuestos y gestión de reservas
- **Diseño responsive** con 3 puntos de ruptura (desktop, tablet, móvil)
- **Accesibilidad** WCAG con contraste AA/AAA, aria-current, prefers-reduced-motion

## Validaciones

| Tipo | Resultado |
|---|---|
| HTML5 (W3C Nu) | 0 errores en todos los documentos |
| CSS3 (W3C Jigsaw) | 0 errores en todas las hojas |
| Contraste de color | AA y AAA superados |
| Adaptabilidad | 3 puntos de ruptura, flexbox/grid, picture |

## Pruebas de usabilidad

Se realizaron 3 tandas con 12 participantes (1 experto + 11 no expertos) en 3 dispositivos (ordenador, tableta, móvil). Documentación completa en `UO277488-PruebasUsabilidad.md`.

---

© 2026 UO277488 - Universidad de Oviedo
