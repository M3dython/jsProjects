const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//Search by song or artist
async function searchSongs(term) {
  //sync await is the same as using fetch and then
  //   fetch(`${apiURL}/suggest/${term}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

//Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  console.log(data);
  console.log(artist, songTitle);
}

//Show song and artist in DOM
function showData(data) {
  // let output = '';

  // data.data.forEach((song) => {
  //   output += `
  //   <li>
  //   <span><strong>${song.artist.name}</strong> - ${song.title} </span>
  //   <button class ="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  // <ul class="songs">
  // ${output}
  // </ul>
  // `;

  //The same code but with map function

  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      (song) => `
  <li>
  <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  <button class="btn" data-artist ="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics </button>
  </li>
  `
    )
    .join('')}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `
        <button 
        class = "btn" 
        onclick ="getMoreSongs('${data.prev}')"
        >Prev</button>`
        : ''
    }
    ${
      data.next
        ? `
        <button 
        class="btn" 
        onclick="getMoreSongs('${data.next}')"
        >Next</button>`
        : ''
    }
    `;
  } else {
    more.innerHTML = '';
  }
}
//Get prev and next results for songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  //heroku cors anywhere
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener('click', (e) => {
  const clickedElement = e.target;
  if (clickedElement.tagName === 'BUTTON') {
    const artist = clickedElement.getAttribute('data-artist');
    const songTitle = clickedElement.getAttribute('data-songtitle');

    console.log(artist, songTitle);
  }
});
