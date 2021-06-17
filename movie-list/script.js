const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12

const dataPanel = document.getElementById('data-panel')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const paginator = document.getElementById('paginator')
const dataToggle = document.getElementById('data-toggle')

let movies = []
let filtered = []
let cards = true
let page = 1

axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results)
  displayPaginator(movies.length)
  displayMovies(getMoviesByPage(1))
})

function displayMovies(movies) {
  if (cards === true) {
    displayMoviesCards(movies)
  } else {
    displayMoviesList(movies)
  }
}

function displayMoviesCards(movies) {
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
            <button class="btn btn-secondary btn-add-favorite" data-id="${movie.id}">+</button>
          </div>
        </div>
      </div>
    </div>`
  })
  dataPanel.innerHTML = html
}

function displayMoviesList(movies) {
  let html = '<table class="table"><tbody>'
  movies.forEach(function (movie) {
    html += `<tr>
      <td>
        <h5 class="card-title">${movie.title}</h5>
      </td>
      <td>
        <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${movie.id}">See Info</button>
        <button class="btn btn-secondary btn-add-favorite" data-id="${movie.id}">+</button>
      </td>
    </tr>`
  })
  html += '</tbody></table>'
  dataPanel.innerHTML = html
}

function displayPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let html = ''
  for (let page = 1; page <= numberOfPages; page++) {
    html += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = html
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

function getMoviesByPage(page) {
  const data = filtered.length ? filtered : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function addToFavorites(id) {
  const list = JSON.parse(localStorage.getItem('favorites')) || []
  const movie = movies.find(movie => movie.id === id)
  if (list.some((movie) => movie.id === id)) {
    return alert('This movie is already in your favorites')
  }
  list.push(movie)
  localStorage.setItem('favorites', JSON.stringify(list))
}

// Event Listeners

dataToggle.addEventListener('click', function onDataTogglePressed(event) {
  if (event.target.matches('.fa-th') && !cards) {
    cards = true
    displayMovies(getMoviesByPage(page))
  } else if (event.target.matches('.fa-bars') && cards) {
    cards = false
    displayMovies(getMoviesByPage(page))
  }
})

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  page = Number(event.target.dataset.page)
  displayMovies(getMoviesByPage(page))
})

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorites(Number(event.target.dataset.id))
  }
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filtered = movies.filter(movie => movie.title.toLowerCase().includes(keyword))

  if (filtered.length === 0) return alert('No movies found')

  displayPaginator(filtered.length)
  displayMovies(getMoviesByPage(1))
})