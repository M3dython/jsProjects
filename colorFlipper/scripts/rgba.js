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
  document.body.style.backgroundColor = randomRgbaColor();
  color.textContent = randomRgbaColor();
}

//Event Listener
btn.addEventListener('click', changeColor);
