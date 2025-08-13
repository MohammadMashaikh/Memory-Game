const cards = document.querySelectorAll('.card');
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0; // Count matched pairs
const totalPairs = cards.length / 2;

// Add click event to all cards
cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.front').textContent ===
                  secondCard.querySelector('.front').textContent;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;
    if (matchedPairs === totalPairs) {
        setTimeout(showWinMessage, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showWinMessage() {
    const winDiv = document.createElement('div');
    winDiv.classList.add('win-message');
    winDiv.innerHTML = `
        <h1>🎉 You Win! 🎉</h1>
        <p>All cards matched!</p>
        <button id="play-again">Play Again</button>
    `;
    document.body.appendChild(winDiv);

    document.getElementById('play-again').addEventListener('click', () => {
        location.reload();
    });
}
