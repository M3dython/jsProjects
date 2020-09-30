const btn = document.getElementById('btn');
const color = document.querySelector('.color');

//Functions
//Ger random Hex Color
function randomHex() {
  var letters = '0123456789abcdef';
  var hexColor = '#';
  for (i = 0; i < 6; i++) {
    hexColor += letters[Math.floor(Math.random() * letters.length)];
  }
  return hexColor.toUpperCase();
}

//change color displayed
function changeColor() {
  document.body.style.backgroundColor = randomHex();
  color.textContent = randomHex();
}

//Event Listeners
btn.addEventListener('click', changeColor);
