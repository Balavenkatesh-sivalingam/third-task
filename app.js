const cards = document.querySelectorAll('.card');
const restartButton = document.querySelector('.restart-button');
const winDisplay = document.getElementById('win');

function shuffleCards() {
  const shuffledCards = [...cards];
  shuffledCards.sort(() => Math.random() - 0.5);
  shuffledCards.forEach(card => {
    document.querySelector('.cards-container').appendChild(card);
  });
}
shuffleCards();

let flippedCards = [];  
let matchedPairs = 0; 


cards.forEach(card => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('fliped') && flippedCards.length < 2) {
      flipCard(card);
    }
  });
});

function flipCard(card) {
  card.classList.add('fliped');
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const firstImg = firstCard.querySelector('.card-back').getAttribute('data-stone');
  const secondImg = secondCard.querySelector('.card-back').getAttribute('data-stone');
  
  if (firstImg === secondImg) {
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
      winDisplay.textContent = "You Win!";
    }
    flippedCards = [];  
  } else {
    setTimeout(() => {
      firstCard.classList.remove('fliped');
      secondCard.classList.remove('fliped');
      flippedCards = [];  
    }, 1000);
  }
}

function restartGame() {
  matchedPairs = 0;
  winDisplay.textContent = '';
  flippedCards = [];
  cards.forEach(card => card.classList.remove('fliped'));
  shuffleCards();
}

restartButton.addEventListener('click', restartGame);



