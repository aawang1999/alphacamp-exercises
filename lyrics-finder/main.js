// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://api.lyrics.ovh/v1/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

// WRITE YOUR CODE ////////////////////////
const songs = album.tracks

songList.innerHTML = songs.map(song => `
    <li class="nav-item">
      <a class="nav-link" data-toggle="pill" href="#">${song}</a>
    </li>
  `
).join('\n')

songList.addEventListener('click', function (event) {
  const url = `${BASE_URL}${album.artist}/${event.target.textContent}`
  axios.get(url)
    .then(response => {
      lyricsPanel.innerHTML = `
        <h3>${event.target.textContent}</h3>
        <br>
        <pre>${response.data.lyrics}</pre>
      `
    })
    .catch(error => {
      console.log(error)
    })
})