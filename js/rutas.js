class RutaManager {
    constructor() {
        this.#inicializar();
    }

    #inicializar() {
        document.querySelector("#xmlFile").addEventListener("change", (event) => this.#cargarXML(event));
    }

    #cargarXML(event) {
        const archivo = event.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = (e) => {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(e.target.result, "text/xml");
                if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                    document.querySelector("#info-rutas").innerHTML = "<p>El archivo XML seleccionado no tiene una estructura válida.</p>";
                    return;
                }
                this.#procesarRutas(xmlDoc);
            } catch (error) {
                document.querySelector("#info-rutas").innerHTML = "<p>Error al procesar el archivo XML.</p>";
            }
        };
        lector.readAsText(archivo);
    }

    #procesarRutas(xmlDoc) {
        const rutas = xmlDoc.getElementsByTagName("ruta");
        const contenedor = document.querySelector("#info-rutas");
        contenedor.replaceChildren();

        if (!rutas || rutas.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron rutas en el archivo XML.</p>";
            return;
        }

        for (let i = 0; i < rutas.length; i++) {
            const ruta = rutas[i];
            const nombre = this.#getTexto(ruta, "nombreRuta");
            const tipo = this.#getTexto(ruta, "tipoRuta");
            const transporte = this.#getTexto(ruta, "medioTransporte");
            const fechaInicio = this.#getTexto(ruta, "fechaInicio");
            const horaInicio = this.#getTexto(ruta, "horaInicio");
            const descripcion = this.#getTexto(ruta, "descripcion");
            const personas = this.#getTexto(ruta, "personas");
            const duracion = this.#getTexto(ruta, "duracion");
            const lugarInicio = this.#getTexto(ruta, "lugarInicio");
            const direccionInicio = this.#getTexto(ruta, "direccionInicio");
            const agencia = this.#getTexto(ruta, "agencia");
            const recomendacion = this.#getTexto(ruta, "recomendacion");
            const planimetria = this.#getTexto(ruta, "planimetria");
            const altimetria = this.#getTexto(ruta, "altimetria");
            const coordenadasInicio = ruta.getElementsByTagName("coordenadas")[0];
            const longitudInicio = this.#getTexto(coordenadasInicio, "longitud");
            const latitudInicio = this.#getTexto(coordenadasInicio, "latitud");
            const altitudInicio = this.#getTexto(coordenadasInicio, "altitud");

            const section = document.createElement("section");
            section.setAttribute("data-role", "ruta");
            section.innerHTML = `
                <h3>${nombre}</h3>
                <p><strong>Tipo:</strong> ${tipo}</p>
                <p><strong>Transporte:</strong> ${transporte}</p>
                <p><strong>Fecha de inicio:</strong> ${fechaInicio || "No indicada"}</p>
                <p><strong>Hora de inicio:</strong> ${horaInicio || "No indicada"}</p>
                <p><strong>Descripción:</strong> ${descripcion}</p>
                <p><strong>Personas adecuadas:</strong> ${personas}</p>
                <p><strong>Duración:</strong> ${duracion}</p>
                <p><strong>Lugar de inicio:</strong> ${lugarInicio}</p>
                <p><strong>Dirección de inicio:</strong> ${direccionInicio}</p>
                <p><strong>Coordenadas iniciales:</strong> Latitud ${latitudInicio}, longitud ${longitudInicio}, altitud ${altitudInicio} m</p>
                <p><strong>Agencia:</strong> ${agencia}</p>
                <p><strong>Recomendación:</strong> ${recomendacion}/10</p>
                <h4>Referencias</h4>
                <ul data-role="referencias-${i}"></ul>
                <h4>Hitos de la ruta</h4>
                <section id="hitos-${i}"></section>
                <h4>Planimetría</h4>
                <section data-role="mapa-ruta" id="mapa-${i}"></section>
                <p><a href="xml/${planimetria}">Archivo KML de la planimetría</a></p>
                <h4>Altimetría</h4>
                <section id="altimetria-${i}"></section>
            `;

            contenedor.appendChild(section);

            this.#mostrarReferencias(ruta, `[data-role="referencias-${i}"]`);
            this.#mostrarHitos(ruta, `hitos-${i}`);

            const hitos = ruta.getElementsByTagName("hito");
            const coordenadas = [];
            for (let j = 0; j < hitos.length; j++) {
                const coords = hitos[j].getElementsByTagName("coordenadasHito")[0];
                if (coords) {
                    const lon = parseFloat(this.#getTexto(coords, "longitud"));
                    const lat = parseFloat(this.#getTexto(coords, "latitud"));
                    if (!isNaN(lon) && !isNaN(lat)) {
                        coordenadas.push([lat, lon]);
                    }
                }
            }

            if (coordenadas.length > 0 && typeof L !== "undefined") {
                const mapa = L.map(`mapa-${i}`).setView(coordenadas[0], 12);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; OpenStreetMap contributors"
                }).addTo(mapa);

                const polyline = [];
                coordenadas.forEach((coord, idx) => {
                    const marker = L.marker(coord).addTo(mapa);
                    const nombreHito = this.#getTexto(hitos[idx], "nombreHito");
                    marker.bindPopup(`<strong>${nombreHito}</strong><br>Lat: ${coord[0]}<br>Lon: ${coord[1]}`);
                    polyline.push(coord);
                });

                if (polyline.length > 1) {
                    L.polyline(polyline, {color: "red", weight: 3}).addTo(mapa);
                }
            } else if (coordenadas.length > 0) {
                document.querySelector(`#mapa-${i}`).innerHTML = "<p>No se pudo cargar la biblioteca cartográfica. Se mantiene disponible el archivo KML enlazado.</p>";
            } else {
                document.querySelector(`#mapa-${i}`).innerHTML = "<p>No hay coordenadas suficientes para representar la planimetría.</p>";
            }

            this.#cargarAltimetria(i, altimetria);
        }
    }

    #mostrarReferencias(ruta, selector) {
        const referencias = ruta.getElementsByTagName("referencia");
        const contenedor = document.querySelector(selector);

        for (let i = 0; i < referencias.length; i++) {
            const url = referencias[i].textContent || "";
            const enlace = document.createElement("a");
            enlace.href = url;
            enlace.rel = "noopener noreferrer";
            enlace.textContent = url;
            const li = document.createElement("li");
            li.appendChild(enlace);
            contenedor.appendChild(li);
        }
    }

    #mostrarHitos(ruta, contenedorId) {
        const hitos = ruta.getElementsByTagName("hito");
        const contenedor = document.querySelector(`#${contenedorId}`);

        for (let i = 0; i < hitos.length; i++) {
            const nombre = this.#getTexto(hitos[i], "nombreHito");
            const descripcion = this.#getTexto(hitos[i], "descripcionHito");
            const distancia = this.#getTexto(hitos[i], "distancia");
            const distanciaUnidad = hitos[i].getElementsByTagName("distancia")[0]?.getAttribute("unidad") || "m";

            const hitoDiv = document.createElement("article");
            hitoDiv.setAttribute("data-role", "hito");
            const p = document.createElement("p");
            p.innerHTML = `<strong>${nombre}</strong> - ${descripcion} (Distancia: ${distancia} ${distanciaUnidad})`;
            hitoDiv.appendChild(p);

            const fotos = hitos[i].getElementsByTagName("foto");
            if (fotos.length > 0) {
                const galeria = document.createElement("figure");
                galeria.setAttribute("data-role", "galeria-grid");
                for (let j = 0; j < fotos.length; j++) {
                    const src = fotos[j].getAttribute("src") || "";
                    const texto = fotos[j].textContent || "";
                    const img = document.createElement("img");
                    img.src = `multimedia/${src}`;
                    img.alt = texto;
                    img.addEventListener("error", function() {
                        const errP = document.createElement("p");
                        errP.textContent = `No se pudo cargar la fotografía: ${texto}`;
                        img.replaceWith(errP);
                    });
                    if (src) galeria.appendChild(img);
                }
                if (galeria.children.length > 0) {
                    hitoDiv.appendChild(galeria);
                }
            }

            const videos = hitos[i].getElementsByTagName("video");
            for (let j = 0; j < videos.length; j++) {
                const src = videos[j].getAttribute("src") || "";
                const texto = videos[j].textContent || "Vídeo de la ruta";
                const video = document.createElement("video");
                video.controls = true;
                const source = document.createElement("source");
                source.src = `multimedia/${src}`;
                source.type = "video/mp4";
                video.appendChild(source);
                const fallback = document.createElement("p");
                fallback.textContent = `Tu navegador no puede reproducir el vídeo: ${texto}`;
                video.appendChild(fallback);
                if (src) hitoDiv.appendChild(video);
            }

            contenedor.appendChild(hitoDiv);
        }
    }

    #cargarAltimetria(indice, archivo) {
        const contenedor = document.querySelector(`#altimetria-${indice}`);
        const nombreArchivo = archivo || `altimetria_ruta${indice + 1}.svg`;
        fetch(`xml/${nombreArchivo}`)
            .then(response => {
                if (!response.ok) throw new Error("No se pudo cargar el SVG");
                return response.text();
            })
            .then(svgContent => {
                contenedor.innerHTML = svgContent;
            })
            .catch(() => {
                contenedor.innerHTML = `<p>No se pudo cargar la altimetría. <a href="xml/${nombreArchivo}">Abrir archivo SVG</a>.</p>`;
            });
    }

    #getTexto(elemento, tag) {
        if (!elemento) return "";
        const el = elemento.getElementsByTagName(tag)[0];
        return el ? (el.textContent || "") : "";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    new RutaManager();
});
