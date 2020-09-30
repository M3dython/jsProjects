//set initial value as counter = 0
let count = 0;

// select value and buttons
const value = document.querySelector('#value');
const buttons = document.querySelectorAll('.btn');

//for each element
buttons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    const buttonClass = event.currentTarget.classList;
    if (buttonClass.contains('decrease')) {
      count--;
    } else if (buttonClass.contains('increase')) {
      count++;
    } else if (buttonClass.contains('double')) {
      count = count * 2;
    } else if (buttonClass.contains('half')) {
      count = count / 2;
    } else if (buttonClass.contains('reset')) {
      count = 0;
    }
    valueColor();
  });
});

//Functions
//Action after the button is pressed

//Change the color of the value
function valueColor() {
  if (count > 0) {
    value.style.color = 'green';
  }
  if (count < 0) {
    value.style.color = 'red';
  }
  if (count === 0) {
    value.style.color = '#222222';
  }
  value.textContent = count;
}
