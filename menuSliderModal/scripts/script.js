// create the constants with the element, get it with the html id
const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle nav
// when you click the element with the toggle ID in html (a <button>) give it the class show-nav, set in CSS to transformX the body
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
//when the button with the class 'open' is click the class show-modal will be add to modal, making it display block, visible

open.addEventListener('click', () => modal.classList.add('show-modal'));

//Hide modal
//when the button with the id close is click it will remove the class show-modal making it display none
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
// when clicking anywhere in the window it will remove the class .show-modal from modal IF it has it
window.addEventListener('click', (e) =>
  //(IS THIS TRUE) ? (IF YES DO THIS) : (ELSE DO THIS)
  e.target == modal ? modal.classList.remove('show-modal') : false
);
