const messageElement = document.getElementById('message');

const randomNumber = getRandomNumber();

//Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

console.log('Number:', randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and Game
recognition.start();

//Capture user speak
function onSpeak(event) {
  const message = event.results[0][0].transcript;

  writeMessage(message);
  checkNumber(message);
}

//Check message against number
function checkNumber(message) {
  const number = +message;

  //Check if is a valid number
  if (Number.isNaN(number)) {
    messageElement.innerHTML += '<div> That is not a valid number! </div>';
    return;
  }

  //Check in range
  if (number > 100 || number < 1) {
    messageElement.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  //Check number

  if (number === randomNumber) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number<br><br>
    It was ${number}</h2>
    <button class="play-btn" id="play-btn">Play Again</button>
    `;
  } else if (number > randomNumber) {
    messageElement.innerHTML += '<div> Go LOWER</div>';
  } else {
    messageElement.innerHTML += '<div> Go HIGHER</div>';
  }
}

//Write what user speaks
function writeMessage(message) {
  messageElement.innerHTML = `
  <div>You said:</div>
  <span class="box">${message}</span>
  `;
}

//Speak result
recognition.addEventListener('result', onSpeak);

//end SR service
recognition.addEventListener('end', () => recognition.start());

//
document.body.addEventListener('click', (event) => {
  if ((event.target.id = 'play-btn')) window.location.reload();
});
