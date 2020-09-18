const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgameElement = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list of words for game
// use and API in the future
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init word
let randomWord;

//Init score
let score = 0;

//Init difficulty
// set difficulty to medium if there is no value in localStorage
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// init Time
let time = 10;

//Focus on text on start
text.focus();

//Start counting down
//updateTime allows to use a function with an interval of time
//call update time every second
const timeInterval = setInterval(updateTime, 1000);

// generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Update time
function updateTime() {
  time--;
  timeElement.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(time);
    //end game
    gameOver();
  }
}

//Update Score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

//end the game, show end on screen
function gameOver() {
  endgameElement.innerHTML = `
  <h3> Time  ran out </h3>
  <p> Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;

  endgameElement.style.display = 'flex';
}

//add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//add the random word
addWordToDom();

//Event listeners
//typing on input
text.addEventListener('input', (event) => {
  const insertedText = event.target.value;
  if (insertedText == randomWord) {
    addWordToDom();
    updateScore();

    //Clear the input
    event.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//Settings button click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', (event) => {
  difficulty = event.target.value;
  console.log(difficulty);
  localStorage.setItem('difficulty', difficulty);
});
