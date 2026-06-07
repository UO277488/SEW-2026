class Juego {
    #preguntas;
    #puntuacion;
    #formulario;
    #contenedorPreguntas;
    #resultado;

    constructor() {
        this.#puntuacion = 0;
        this.#formulario = document.querySelector("#formulario-juego");
        this.#contenedorPreguntas = document.querySelector("#preguntas");
        this.#resultado = document.querySelector("#resultado");
        this.#preguntas = [
            {
                pregunta: "¿Cuál es el pico más alto de España situado en Tenerife?",
                opciones: ["Montaña Blanca", "Pico del Teide", "Roque Cinchado", "Montaña de Guajara", "Pico Viejo"],
                correcta: 1
            },
            {
                pregunta: "¿Cuál es la capital de la provincia de Santa Cruz de Tenerife?",
                opciones: ["La Laguna", "Puerto de la Cruz", "Santa Cruz de Tenerife", "Los Cristianos", "Adeje"],
                correcta: 2
            },
            {
                pregunta: "¿Cuánto mide aproximadamente el Teide?",
                opciones: ["2500 metros", "3000 metros", "3715 metros", "4200 metros", "2000 metros"],
                correcta: 2
            },
            {
                pregunta: "¿Qué salsa típica canaria acompaña a las papas arrugadas?",
                opciones: ["Alioli", "Mojo picón", "Salsa verde", "Mayonesa", "Kétchup"],
                correcta: 1
            },
            {
                pregunta: "¿Qué parque nacional se encuentra en Tenerife?",
                opciones: ["Parque Nacional de Garajonay", "Parque Nacional del Teide", "Parque Nacional de Timanfaya", "Parque Nacional de Doñana", "Parque Nacional de la Sierra Nevada"],
                correcta: 1
            },
            {
                pregunta: "¿Cuál es el gentilicio de los habitantes de Santa Cruz de Tenerife?",
                opciones: ["tinerfeño/a", "santacrucero/a", "canario/a", "chicharrero/a", "lagunero/a"],
                correcta: 1
            },
            {
                pregunta: "¿Qué son las papas arrugadas?",
                opciones: ["Papas fritas crujientes", "Papas hervidas con sal", "Papas asadas al horno", "Papas rellenas de queso", "Papas en puré"],
                correcta: 1
            },
            {
                pregunta: "¿Cuál de los siguientes es un ingrediente típico canario?",
                opciones: ["Gofio", "Bacalao", "Tortilla", "Paella", "Fabada"],
                correcta: 0
            },
            {
                pregunta: "¿Qué son los Acantilados de Los Gigantes?",
                opciones: ["Playas de arena dorada", "Paredes verticales de hasta 600m sobre el mar", "Montañas cubiertas de nieve", "Valles verdes con cultivos", "Zonas industriales"],
                correcta: 1
            },
            {
                pregunta: "¿Qué reserva de la biosfera se encuentra en Tenerife?",
                opciones: ["Parque Rural de Anaga", "Parque Nacional de Garajonay", "Reserva de El Hierro", "Parque Natural de la Palma", "Reserva de Fuerteventura"],
                correcta: 0
            }
        ];
    }

    #generarPreguntas() {
        this.#contenedorPreguntas.replaceChildren();

        this.#preguntas.forEach((pregunta, indicePregunta) => {
            const articulo = document.createElement("article");
            const enunciado = document.createElement("p");
            enunciado.textContent = `${indicePregunta + 1}. ${pregunta.pregunta}`;
            articulo.appendChild(enunciado);

            pregunta.opciones.forEach((opcion, indiceOpcion) => {
                const etiqueta = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `pregunta_${indicePregunta}`;
                input.value = indiceOpcion.toString();
                input.required = true;

                etiqueta.appendChild(input);
                etiqueta.append(` ${opcion}`);
                articulo.appendChild(etiqueta);
            });

            this.#contenedorPreguntas.appendChild(articulo);
        });
    }

    #corregir(event) {
        event.preventDefault();
        this.#puntuacion = 0;

        if (!this.#formulario.reportValidity()) {
            return;
        }

        this.#preguntas.forEach((pregunta, indicePregunta) => {
            const seleccion = this.#formulario.querySelector(`input[name="pregunta_${indicePregunta}"]:checked`);
            if (seleccion && Number(seleccion.value) === pregunta.correcta) {
                this.#puntuacion++;
            }
        });

        const parrafo = document.createElement("p");
        parrafo.textContent = `Has obtenido una puntuación de ${this.#puntuacion} sobre 10.`;
        this.#resultado.replaceChildren(parrafo);
        this.#resultado.setAttribute("data-role", "resultado-juego");
        this.#formulario.hidden = true;
    }

    iniciar() {
        this.#generarPreguntas();
        this.#formulario.addEventListener("submit", (event) => this.#corregir(event));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const juego = new Juego();
    juego.iniciar();
});
