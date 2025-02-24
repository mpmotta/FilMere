const API_KEY = "ec332d19e6fed067df0160ce34067cc4"; // Sua chave da API
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w200"; // Tamanho menor da imagem
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=`;

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", searchMovies);

async function searchMovies() {
    const searchTerm = searchInput.value;
    if (!searchTerm) return;

    try {
        const response = await fetch(SEARCH_URL + searchTerm);
        const data = await response.json();

        displayResults(data.results);
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        resultsDiv.innerHTML = "<p>Erro ao buscar filmes.</p>";
    }
}

function displayResults(movies) {
    resultsDiv.innerHTML = ""; // Limpa os resultados anteriores

    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const moviePoster = document.createElement("img");
            moviePoster.src = IMAGE_URL + movie.poster_path;
            moviePoster.alt = movie.title;
            moviePoster.classList.add("movie-poster");

            moviePoster.addEventListener("click", () => {
                window.location.href = `movie.html?movie=${encodeURIComponent(JSON.stringify(movie))}`;
            });

            resultsDiv.appendChild(moviePoster);
        });
    } else {
        resultsDiv.innerHTML = "<p>Nenhum filme encontrado.</p>";
    }
}
