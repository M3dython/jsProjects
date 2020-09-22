// get the DOM elements by its HTML ID
const currencyElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  // adds to the constants the value on the DOM element
  const currencyOne_ = currencyElementOne.value;
  const currencyTwo_ = currencyElementTwo.value;

  // get the rate, accordingly with the currency selected
  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne_}`)
    .then((result) => result.json())
    .then((data) => {
      // when the data is retrieved to the following
      const rate = data.rates[currencyTwo_];
      // change the inner text of the element to the rate fetched from the API
      rateElement.innerText = `1 ${currencyOne_}= ${rate.toFixed(
        2
      )} ${currencyTwo_} `;
      // toFixed trim the number to two decimal places
      // the value of amountElementTwo will be the value of amountElementOne times the rate fetched
      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
}

//Event listeners
//when the element changed do calculate
currencyElementOne.addEventListener('change', calculate);
// when there is there is a new input do calculate
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

// if the button swap is clicked do the following function
swap.addEventListener('click', () => {
  // set the constant temp with currencyElementOne value
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});

calculate();
