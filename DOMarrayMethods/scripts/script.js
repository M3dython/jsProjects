const main = document.getElementById('main');
const addUserBTN = document.getElementById('add-User');
const doubleMoneyBTN = document.getElementById('double-Money');
const showOnlyMillionairesBTN = document.getElementById(
  'show-Only-Millionaires'
);
const sortByRichestBTN = document.getElementById('sort-By-Richest');
const calculateWealthBTN = document.getElementById('calculate-Wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.random() * 1000000,
  };

  addData(newUser);
}

//Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
  //Clear the main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</strong>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Double the amount of money
function twoMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Function sort by wealth
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//Filter and show only Millionaires
function showOnlyMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

//Calcule the Wealth

let counter = 0;
function calculateWealth() {
  if (counter <= 0) {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement('div');

    wealthElement.innerHTML = `<h3 class="entire-millionaires"> Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;

    main.appendChild(wealthElement);
    counter++;
  }
}

// Event Listeners
addUserBTN.addEventListener('click', getRandomUser);
doubleMoneyBTN.addEventListener('click', twoMoney);
sortByRichestBTN.addEventListener('click', sortByRichest);
showOnlyMillionairesBTN.addEventListener('click', showOnlyMillionaires);
calculateWealthBTN.addEventListener('click', calculateWealth);
