const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12

const dataPanel = document.getElementById('data-panel')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const paginator = document.getElementById('paginator')

let movies = JSON.parse(localStorage.getItem('favorites')) || []

function displayMovies(movies) {
  let html = ''
  movies.forEach(function (movie) {
    html += `<div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${POSTER_URL + movie.image}" alt="Movie Image" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${movie.id}">See Info</button>
            <button class="btn btn-danger btn-remove-favorite" data-id="${movie.id}">X</button>
          </div>
        </div>
      </div>
    </div>`
  })
  dataPanel.innerHTML = html
}

function showMovieModal(id) {
  const modalName = document.getElementById('movie-modal-name')
  const modalImage = document.getElementById('movie-modal-image')
  const modalDescription = document.getElementById('movie-modal-description')

  axios.get(INDEX_URL + id).then((response) => {
    const movie = response.data.results
    modalName.textContent = `${movie.title}`
    modalImage.innerHTML = `<img src="${POSTER_URL + movie.image}" class="img-fluid" alt="Responsive image">`
    modalDescription.innerHTML = `<p>Release date: ${movie.release_date}</p>
      <p>${movie.description}</p>
    `
  })
}

function removeFromFavorites(id) {
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  movies.splice(movieIndex, 1)
  localStorage.setItem('favorites', JSON.stringify(movies))
  displayPaginator(movies.length)
  displayMovies(getMoviesByPage(1))
}

function displayPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let html = ''
  for (let page = 1; page <= numberOfPages; page++) {
    html += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = html
}

function getMoviesByPage(page) {
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorites(Number(event.target.dataset.id))
  }
})

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  displayMovies(getMoviesByPage(page))
})

displayPaginator(movies.length)
displayMovies(getMoviesByPage(1))