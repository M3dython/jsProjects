// clg = console.log

const currencyElementOne = document.getElementById('currencyOne');
const amountElementOne = document.getElementById('amountOne');
const currencyElementTwo = document.getElementById('currencyTwo');
const amountElementTwo = document.getElementById('amountTwo');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currencyOne_ = currencyElementOne.value;
  const currencyTwo_ = currencyElementTwo.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne_}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo_];

      rateElement.innerText = `1 ${currencyOne_}= ${rate} ${currencyTwo_} `;

      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
}

//Event listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});

calculate();
