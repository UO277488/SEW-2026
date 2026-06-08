class Noticias {
    #apiKey;
    #url;

    constructor() {
        this.#apiKey = "pub_1b2135cb947a4939b50ff0a92d91b3e2";
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
        const contenedor = document.querySelector("#noticias");
        contenedor.replaceChildren();

        if (!noticias || noticias.length === 0) {
            const p = document.createElement("p");
            p.textContent = "No se pudieron cargar las noticias en este momento.";
            contenedor.appendChild(p);
            return;
        }

        noticias.forEach(noticia => {
            const fecha = noticia.pubDate ? new Date(noticia.pubDate).toLocaleDateString("es-ES") : "";
            const article = document.createElement("article");
            const titulo = document.createElement("h3");
            titulo.textContent = noticia.title || "Sin título";
            const descripcion = document.createElement("p");
            descripcion.textContent = noticia.description || "";
            const fuente = document.createElement("a");
            fuente.href = noticia.link;
            fuente.target = "_blank";
            fuente.rel = "noopener noreferrer";
            fuente.textContent = "Leer más";
            const metadata = document.createElement("p");
            metadata.setAttribute("data-role", "fecha-noticia");
            metadata.textContent = fecha ? `Publicado: ${fecha}` : "";

            article.append(titulo, descripcion, metadata, fuente);
            contenedor.appendChild(article);
        });
    }

    async iniciar() {
        const noticias = await this.#getNoticias();
        this.#mostrarNoticias(noticias);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const noticias = new Noticias();
    noticias.iniciar();
});
