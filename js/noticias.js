class Noticias {
    #apiKey;
    #url;

    constructor() {
        this.#apiKey = "pub_68725bae69aa36d2c08a34a3ef92fafeb87ee";
        this.#url = "https://newsdata.io/api/1/news";
    }

    async #getNoticias() {
        try {
            const response = await fetch(`${this.#url}?apikey=${this.#apiKey}&q=Tenerife&language=es&size=6`);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            return [];
        }
    }

    #mostrarNoticias(noticias) {
        const contenedor = $("#noticias");
        contenedor.empty();

        if (!noticias || noticias.length === 0) {
            contenedor.html("<p>No se pudieron cargar las noticias en este momento.</p>");
            return;
        }

        noticias.forEach(noticia => {
            const fecha = noticia.pubDate ? new Date(noticia.pubDate).toLocaleDateString("es-ES") : "";
            const article = $("<article>");
            const titulo = $("<h3>").text(noticia.title || "Sin título");
            const descripcion = $("<p>").text(noticia.description || "");
            const fuente = $("<a>").attr("href", noticia.link).attr("target", "_blank").attr("rel", "noopener noreferrer").text("Leer más");
            const metadata = $("<p>").attr("data-role", "fecha-noticia").text(fecha ? `Publicado: ${fecha}` : "");

            article.append(titulo, descripcion, metadata, fuente);
            contenedor.append(article);
        });
    }

    async iniciar() {
        const noticias = await this.#getNoticias();
        this.#mostrarNoticias(noticias);
    }
}

$(document).ready(function() {
    const noticias = new Noticias();
    noticias.iniciar();
});
