// get all the DOM elements by its HTML ID

const main = document.getElementById('main');
const addUserBTN = document.getElementById('add-User');
const doubleMoneyBTN = document.getElementById('double-Money');
const showOnlyMillionairesBTN = document.getElementById(
  'show-Only-Millionaires'
);
const sortByRichestBTN = document.getElementById('sort-By-Richest');
const calculateWealthBTN = document.getElementById('calculate-Wealth');

// create an empty array called data to be used
let data = [];

// get three random users from the random user API
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
// gets the response with a promise

// How to set a basic fetch request
// fetch('url')
// .then(response => response.json())
// .then(data => f(){})
// there is a different way

async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();

  //the data fetched is putted inside the constant object "user". From this API get the array inside the object at place 0. "results" is a property of the API object
  const user = data.results[0];

  // create a new constant as an object filled with user object properties
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    // the money property is created with the Math.random method
    money: Math.random() * 1000000,
  };

  //the addData adds the object "newUser" to an array
  addData(newUser);
}

//Add new object to data arr
function addData(object) {
  // the push method add a new item to an array
  // here it will be add the object from the function getRandomUser each time it is called
  data.push(object);

  // the DOM should be updated every time a new random user is created
  updateDOM();
}

//This function Updates the DOM
// Inside here the provided data will be equal the array data
function updateDOM(providedData = data) {
  //Clear the main div
  // The main div should be cleaned so the last information added is not displayed twice
  main.innerHTML = '<h2><strong>Person</strong>Wealth</strong>';
  // for each item of the array do the following function
  providedData.forEach((item) => {
    // create a divwith the class person and the money and name inside it
    const element = document.createElement('div');
    element.classList.add('person');
    // item is the array[x] item
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    // adds the created element to the main element
    main.appendChild(element);
  });

  // reset the counter every time the DOM is updated
  counter = 0;
}

// Format number as money
// to fixed method rounds the number with two decimal places
// replace method replace the selected characters for the desired ones
function formatMoney(number) {
  // the RegExp Object \d do a global search for non-digit characters
  //makes the method perform a global match, finding all matches, instead of stopping at the first one
  // if there is more than three digits add a . in between
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Double the amount of money
function twoMoney() {
  //The map method do the following function to the entire array
  //doubles the money of each user
  //deconstruct the object user "...user" and do the doubling function only at the property money
  //deconstructing an array makes possible to unpack values from arrays, or properties from objects, into distinct variables
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Function sort by wealth
function sortByRichest() {
  // sorts the element of an array, in this casing showing the bigger one first,from the function result(b-a)
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//Filter and show only Millionaires
function showOnlyMillionaires() {
  // filter creates a new array with every element that passed the test
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

//Calcule the Wealth

//the counter let variable is used so the function works only one time
// calculateWealth adds a DOM element only one time
let counter = 0;
function calculateWealth() {
  if (counter <= 0) {
    // puts inside the constant wealth the reduced values of the array (only one element)
    // reduces uses and accumulator and an array
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    // creates an h3 DOM element to be appended to the main DOM element
    const wealthElement = document.createElement('div');

    wealthElement.innerHTML = `<h3 class="entire-millionaires"> Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;

    main.appendChild(wealthElement);
    // adds a 1 to counter
    counter++;
  }
}

// Event Listeners
// do the following function after the event click on the designated element
addUserBTN.addEventListener('click', getRandomUser);
doubleMoneyBTN.addEventListener('click', twoMoney);
sortByRichestBTN.addEventListener('click', sortByRichest);
showOnlyMillionairesBTN.addEventListener('click', showOnlyMillionaires);
calculateWealthBTN.addEventListener('click', calculateWealth);
