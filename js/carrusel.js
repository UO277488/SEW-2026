class Carrusel {
    #fotos;
    #indice;
    #intervalo;
    #imagen;
    #anterior;
    #siguiente;

    constructor() {
        this.#fotos = [
            {
                src: "multimedia/mapa_santacruz.jpg",
                alt: "Mapa de situación de la provincia de Santa Cruz de Tenerife"
            },
            {
                src: "multimedia/teide.jpg",
                alt: "Parque Nacional del Teide"
            },
            {
                src: "multimedia/playa_teresitas.jpg",
                alt: "Playa de Las Teresitas"
            },
            {
                src: "multimedia/laguna.jpg",
                alt: "San Cristóbal de La Laguna"
            },
            {
                src: "multimedia/gigantes.jpg",
                alt: "Acantilados de Los Gigantes"
            },
            {
                src: "multimedia/anaga.jpg",
                alt: "Parque Rural de Anaga"
            }
        ];
        this.#indice = 0;
        this.#intervalo = null;
        this.#imagen = document.querySelector("#imagen-carrusel");
        this.#anterior = document.querySelector("#anterior");
        this.#siguiente = document.querySelector("#siguiente");
    }

    #cambiarFotografia(direccion) {
        this.#indice = (this.#indice + direccion + this.#fotos.length) % this.#fotos.length;
        this.#imagen.src = this.#fotos[this.#indice].src;
        this.#imagen.alt = this.#fotos[this.#indice].alt;
    }

    iniciar() {
        this.#anterior.addEventListener("click", () => this.#cambiarFotografia(-1));
        this.#siguiente.addEventListener("click", () => this.#cambiarFotografia(1));
        this.#imagen.addEventListener("error", function() {
            var src = this.src;
            if (src.indexOf(".jpg") !== -1) {
                this.onerror = null;
                this.src = src.replace(".jpg", ".png");
            } else {
                this.alt = "No se pudo cargar la fotografía del carrusel";
            }
        });

        this.#intervalo = setInterval(() => this.#cambiarFotografia(1), 3000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const carrusel = new Carrusel();
    carrusel.iniciar();
});
