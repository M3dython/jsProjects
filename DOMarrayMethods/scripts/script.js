const main = document.getElementById('main');
const addUser = document.getElementById('addUser');
const doubleMoney = document.getElementById('doubleMoney');
const showOnlyMillionaires = document.getElementById('showOnlyMillionaires');
const sortByRichest = document.getElementById('sortByRichest');
const calculateWealth = document.getElementById('calculateWealth');

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
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}
//Add new obj to data arr
function addData(object) {
  data.push(object);
}
