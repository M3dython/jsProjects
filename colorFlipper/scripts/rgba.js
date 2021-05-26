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

//Change color
function changeColor() {
  var changedColor = randomRgbaColor();
  document.body.style.backgroundColor = changedColor;
  color.textContent = changedColor;
}

//Event Listener
btn.addEventListener('click', changeColor);
