const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentElement = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsElement = [];

// Store card data
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'a letter, $ or _',
//   },
//   {
//     question: 'What is a variable',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'ThisIsAVariable',
//   },
// ];
const cardsData = getCardsData();

//Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
//Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class ="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  //Add to DOM cards
  cardsElement.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

//Get cards from local storage
function getCardsData() {
  // localStorage only storage strings, so it should became back an array
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

//Add card to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));

  //reload the page after stored
  window.location.reload();
}

//Show number of cards
function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}

//Function caller
createCards();

//Event listeners

//Next button
nextBtn.addEventListener('click', () => {
  cardsElement[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsElement.length - 1) {
    currentActiveCard = cardsElement.length - 1;
  }

  cardsElement[currentActiveCard].className = 'card active';

  updateCurrentText();
});

//previous button
prevBtn.addEventListener('click', () => {
  cardsElement[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsElement[currentActiveCard].className = 'card active';

  updateCurrentText();
});

//Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//Hide the add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionElement.value;
  const answer = answerElement.value;
  console.log(question, answer);

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionElement.value = '';
    answerElement.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//Clear all cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
