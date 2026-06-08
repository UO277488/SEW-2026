class Carrusel {
    #fotos;
    #indice;
    #intervalo;

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
    }

    #cambiarFotografia(direccion) {
        this.#indice = (this.#indice + direccion + this.#fotos.length) % this.#fotos.length;
        $("#imagen-carrusel")
            .attr("src", this.#fotos[this.#indice].src)
            .attr("alt", this.#fotos[this.#indice].alt);
    }

    iniciar() {
        $("#anterior").on("click", () => this.#cambiarFotografia(-1));
        $("#siguiente").on("click", () => this.#cambiarFotografia(1));
        $("#imagen-carrusel").on("error", function() {
            var src = $(this).attr("src");
            if (src.indexOf(".jpg") !== -1) {
                this.onerror = null;
                $(this).attr("src", src.replace(".jpg", ".png"));
            } else {
                $(this).attr("alt", "No se pudo cargar la fotografía del carrusel");
            }
        });

        this.#intervalo = setInterval(() => this.#cambiarFotografia(1), 3000);
    }
}

$(document).ready(function() {
    const carrusel = new Carrusel();
    carrusel.iniciar();
});
