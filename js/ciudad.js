class Ciudad {
    #nombre;
    #pais;
    #gentilicio;
    #poblacion;
    #coordenadas;

    constructor(nombre, pais, gentilicio) {
        this.#nombre = nombre;
        this.#pais = pais;
        this.#gentilicio = gentilicio;
        this.#poblacion = "";
        this.#coordenadas = {};
    }

    rellenarAtributos(poblacion, coordenadas) {
        this.#poblacion = poblacion;
        this.#coordenadas = coordenadas;
    }

    obtenerNombre() {
        return this.#nombre;
    }

    obtenerPais() {
        return this.#pais;
    }

    obtenerGentilicioPoblacion() {
        const ul = $("<ul>");
        ul.append($("<li>").text(`Gentilicio: ${this.#gentilicio}`));
        ul.append($("<li>").text(`Población: ${this.#poblacion}`));
        return ul;
    }

    obtenerDescripcion() {
        return `La ciudad de ${this.#nombre} se encuentra en ${this.#pais}. Sus habitantes son conocidos como ${this.#gentilicio} y cuenta con una población de aproximadamente ${this.#poblacion} habitantes.`;
    }

    mostrarCoordenadas() {
        const p = $("<p>").text(`Coordenadas: Latitud ${this.#coordenadas.latitud}, Longitud ${this.#coordenadas.longitud}`);
        $("#meteo-info").append(p);
    }
}

class CiudadMeteorologia extends Ciudad {
    #urlApi;

    constructor(nombre, pais, gentilicio) {
        super(nombre, pais, gentilicio);
        this.#urlApi = "https://api.open-meteo.com/v1/forecast";
    }

    async #getMeteorologia() {
        const params = {
            latitude: 28.4682,
            longitude: -16.2546,
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
            daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,wind_speed_10m_max",
            timezone: "Atlantic/Canary",
            forecast_days: 7
        };

        try {
            const response = await $.ajax({
                url: this.#urlApi,
                method: "GET",
                data: params,
                dataType: "json"
            });
            return response;
        } catch (error) {
            return null;
        }
    }

    #traducirCodigo(codigo) {
        const codigos = {
            0: "Despejado", 1: "Mayormente despejado", 2: "Parcialmente nublado",
            3: "Nublado", 45: "Niebla", 48: "Niebla con escarcha",
            51: "Llovizna ligera", 53: "Llovizna moderada", 55: "Llovizna densa",
            61: "Lluvia ligera", 63: "Lluvia moderada", 65: "Lluvia fuerte",
            71: "Nevada ligera", 73: "Nevada moderada", 75: "Nevada fuerte",
            80: "Chubascos ligeros", 81: "Chubascos moderados", 82: "Chubascos fuertes",
            95: "Tormenta", 96: "Tormenta con granizo ligero", 99: "Tormenta con granizo fuerte"
        };
        return codigos[codigo] || "Desconocido";
    }

    async mostrarMeteorologia() {
        const datos = await this.#getMeteorologia();
        const contenedor = $("#meteo-info");

        if (!datos || !datos.current) {
            contenedor.html("<p>No se pudieron obtener los datos meteorológicos.</p>");
            return;
        }

        const current = datos.current;
        const html = `
            <h3>Tiempo actual en ${this.obtenerNombre()}</h3>
            <p>Temperatura: ${current.temperature_2m}°C</p>
            <p>Sensación térmica: ${current.apparent_temperature}°C</p>
            <p>Humedad: ${current.relative_humidity_2m}%</p>
            <p>Precipitación: ${current.precipitation} mm</p>
            <p>Viento: ${current.wind_speed_10m} km/h</p>
            <p>Estado: ${this.#traducirCodigo(current.weather_code)}</p>
        `;
        contenedor.html(html);
    }

    async mostrarPrevision() {
        const datos = await this.#getMeteorologia();
        const contenedor = $("#meteo-prevision");

        if (!datos || !datos.daily) {
            contenedor.html("<p>No se pudieron obtener los datos de previsión.</p>");
            return;
        }

        const daily = datos.daily;
        let html = "<h3>Previsión para los próximos 7 días</h3><table><thead><tr><th scope='col'>Fecha</th><th scope='col'>Máx</th><th scope='col'>Mín</th><th scope='col'>Precipitación</th><th scope='col'>Viento</th><th scope='col'>Estado</th></tr></thead><tbody>";

        for (let i = 0; i < daily.time.length; i++) {
            const fecha = new Date(daily.time[i]).toLocaleDateString("es-ES");
            html += `<tr><td>${fecha}</td><td>${daily.temperature_2m_max[i]}°C</td><td>${daily.temperature_2m_min[i]}°C</td><td>${daily.precipitation_sum[i]} mm</td><td>${daily.wind_speed_10m_max[i]} km/h</td><td>${this.#traducirCodigo(daily.weather_code[i])}</td></tr>`;
        }

        html += "</tbody></table>";
        contenedor.html(html);
    }
}

$(document).ready(function() {
    const ciudad = new CiudadMeteorologia("Santa Cruz de Tenerife", "España", "santacrucero/a");
    ciudad.rellenarAtributos("208,563", {latitud: "28.4682", longitud: "-16.2546"});
    ciudad.mostrarMeteorologia();
    ciudad.mostrarPrevision();
});
