// UNIVERSAL CONSTANTS AND VARIABLES
// get all elements with the id of form in the html
const form = document.getElementById('form');
// gets all elements with the id of username
const username = document.getElementById('username');
// gets all elements with the id of email
const email = document.getElementById('email');
// gets all elements with the id of password
const password = document.getElementById('password');
// gets all elements with the id of password2
const password2 = document.getElementById('password2');

// FUNCTIONS

// Show input error message
// has the parameter input and message
function showError(input, message) {
  // gives the formControl constant the value of the input parameter
  const formControl = input.parentElement;
  // changes the formControl class name in the html
  formControl.className = 'form-control error';
  // gives the constant small the constant form control with the output of the querySelector function, the function invokes the small variable (as a parameter)
  const small = formControl.querySelector('small');
  // makes the innerText of the small constant equals the message parameter
  small.innerText = message;
}

// Show success outline, with input as a parameter
function showSuccess(input) {
  //parent element get the node name of the parent element, it will be added to the form control, and change its class to success
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  //re is used as variables to be tested if the email format is valid
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // test method tests for a match in "re"
  //trim method removes whitespace from both sides
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
//the input of the checkRequired function must be an array
function checkRequired(inputArr) {
  // for each element of the array, check the function with the input as parameter
  inputArr.forEach(function (input) {
    //if the input is empty show that the field name is required to be filled
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input string length
// input, min and max will be this function parameter
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      //the field name is floating, so this function can be used in more then one place
      `${getFieldName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get Field name
function getFieldName(input) {
  //makes the first letter uppercase. then adds the rest of the string
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check passwords match

function checkPasswordsMatch(input1, input2) {
  // if the value of the first is different of the value of the second show error
  if (input1.value !== input2.value) {
    showError(input2, `Passwords do not match`);
  }
}

// EVENT LISTENERS
// the event parameter has different methods; prevent default wont let it work as default
//after submit do the following functions
form.addEventListener('submit', function (event) {
  event.preventDefault();
  //create the array checkRequired and gives the values from the html input
  checkRequired([username, email, password, password2]);
  //call the function checking the min,max length of the first parameter
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkLength(password2, 6, 25);
  //checks if the email is valid
  checkEmail(email);
  // checks if the passwords match
  checkPasswordsMatch(password, password2);
});
