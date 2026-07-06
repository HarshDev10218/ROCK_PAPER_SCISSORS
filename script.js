let playerScore = 0;
let computerScore = 0;
const WINNING_SCORE = 3;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundResultEl = document.getElementById('round-result');
const playerHandEl = document.getElementById('player-hand');
const computerHandEl = document.getElementById('computer-hand');

const resetBtn = document.getElementById('reset-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const choices = document.querySelectorAll('.choice-btn');

const winScreen = document.getElementById('win-screen');
const finalAnnouncement = document.getElementById('final-announcement');
const finalEmoji = document.getElementById('final-emoji');

const emojiMap = {
    'rock': '✊',
    'paper': '✋',
    'scissors': '✌️'
};

function getComputerChoice() {
    const gameChoices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * gameChoices.length);
    return gameChoices[randomIndex];
}

function playRound(playerChoice) {
    // 🛡️ SECURITY GUARD: Prevents playing further rounds if a winner already exists
    if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
        return; 
    }

    const computerChoice = getComputerChoice();
    
    playerHandEl.textContent = emojiMap[playerChoice];
    computerHandEl.textContent = emojiMap[computerChoice];

    let result = "";

    if (playerChoice === computerChoice) {
        result = `It's a tie! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        result = `You win this round!`;
    } else {
        computerScore++;
        result = `Computer wins this round!`;
    }

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    roundResultEl.textContent = result;

    if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
        triggerWinScreen();
    }
}

function triggerWinScreen() {
    // Reset any previous theme classes
    winScreen.classList.remove('win-player', 'win-computer');

    if (playerScore === WINNING_SCORE) {
        finalAnnouncement.textContent = "🏆 Victory! You beat the computer! 🏆";
        finalEmoji.textContent = "👑";
        winScreen.classList.add('win-player'); // Styled via CSS now
    } else {
        finalAnnouncement.textContent = "💻 Game Over! Computer Wins! 💻";
        finalEmoji.textContent = "🤖";
        winScreen.classList.add('win-computer'); // Styled via CSS now
    }
    winScreen.classList.remove('hidden');
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerHandEl.textContent = '❓';
    computerHandEl.textContent = '❓';
    roundResultEl.textContent = 'First to 3 wins takes the crown!';
    winScreen.classList.add('hidden');
}

choices.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        playRound(playerChoice);
    });
});

resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);