const API_KEY = "ec332d19e6fed067df0160ce34067cc4"; // Sua chave da API
const BASE_URL = "https://api.themoviedb.org/3";
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

    displayResults(data, response.status); // Passa o código HTTP para a função displayResults
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    resultsDiv.innerHTML = "<p>Erro ao buscar filmes.</p>";
  }
}

function displayResults(data, statusCode) {
  resultsDiv.innerHTML = ""; // Limpa os resultados anteriores

  if (data && data.results.length > 0) {
    // Exibe os dados de cada filme em formato JSON e o código HTTP
    data.results.forEach(movie => {
      const movieData = document.createElement('pre'); // Usamos <pre> para preservar a formatação
      movieData.textContent = `Código HTTP: ${statusCode}\n${JSON.stringify(movie, null, 2)}`;
      resultsDiv.appendChild(movieData);
    });
  } else {
    resultsDiv.innerHTML = "<p>Nenhum filme encontrado.</p>";
  }
}
