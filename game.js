const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍒', '🥝', '🍍', '🍌', '🍑', '🍓', '🍐'];
const totalCards = symbols.length * 2;
let flippedCards = [];
let matchedCards = [];

function initializeGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    // Create card pairs with symbols
    let cards = [];
    for (let i = 0; i < totalCards; i++) {
        const symbol = symbols[i % symbols.length];
        cards.push(createCard(symbol));
    }

    // Shuffle cards
    cards = shuffle(cards);

    // Add cards to game board
    cards.forEach(card => gameBoard.appendChild(card));
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = '<span class="symbol">' + symbol + '</span>';
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const symbol1 = flippedCards[0].querySelector('.symbol').innerHTML;
    const symbol2 = flippedCards[1].querySelector('.symbol').innerHTML;

    if (symbol1 === symbol2) {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.classList.add('matched');
            matchedCards.push(card);
        });
    } else {
        flippedCards.forEach(card => card.classList.remove('flipped'));
    }

    flippedCards = [];
    checkGameEnd();
}

function checkGameEnd() {
    if (matchedCards.length === totalCards) {
        alert('Congratulations! You matched all pairs!');
    }
}

function resetGame() {
    flippedCards = [];
    matchedCards = [];
    initializeGame();
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Initialize the game
initializeGame();
