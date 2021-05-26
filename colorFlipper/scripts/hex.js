const btn = document.getElementById('btn');
const color = document.querySelector('.color');

//Functions
//Get random Hex Color
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
  var changedColor = randomHex();
  document.body.style.backgroundColor = changedColor;
  color.textContent = changedColor;
}

//Event Listeners
btn.addEventListener('click', changeColor);
