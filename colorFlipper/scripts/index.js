const btn = document.getElementById('btn');
const color = document.querySelector('.color');

//Functions
//Generate random RGBA color
function randomRgbaColor() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    'rgba(' +
    o(r() * s) +
    ', ' +
    o(r() * s) +
    ', ' +
    o(r() * s) +
    ', ' +
    r().toFixed(1) +
    ')'
  );
}
//Generate random Hex color
function randomHexColor() {
  var letters = '0123456789abcdef';
  var hexColor = '#';
  for (var i = 0; i < 6; i++) {
    hexColor += letters[Math.floor(Math.random() * letters.length)];
  }
  return hexColor.toUpperCase();
}

//Event Listeners

btn.addEventListener('click', function () {
  //Call to generate a random color
  const colors = [randomRgbaColor(), randomHexColor()];

  //Get random number between 0 - 1
  const randomNumber = Math.floor(Math.random() * colors.length);

  document.body.style.backgroundColor = colors[randomNumber];
  color.textContent = colors[randomNumber];
});
