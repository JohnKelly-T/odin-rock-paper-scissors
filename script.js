function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);

    switch(choice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function playRound(computerChoice, playerChoice) {
    let outcome;
    
    if (computerChoice === playerChoice) {
        outcome = "tie";
    } else if (computerChoice === "rock" && playerChoice === "scissors"
        || computerChoice === "paper" && playerChoice === "rock"
        || computerChoice === "scissors" && playerChoice === "paper"
    ) {
        outcome = "lose";
    }
    else {
        outcome = "win";
    }

    if (outcome === "tie") {
        console.log(`It's a tie! Both chose ${playerChoice}`)
    } else if (outcome === "win") {
        console.log(`You win! ${playerChoice} beats ${computerChoice}`);
    } else {
        console.log(`You lose! ${computerChoice} beats ${playerChoice}`);
    }

    return outcome;
}


let computerScore = 0;
let playerScore = 0;

let choices = document.querySelector(".choices-container");
let results = document.querySelector(".result-text");
let playerScoreboard = document.querySelector(".player-score");
let computerScoreboard = document.querySelector(".computer-score");

let rockButton = document.querySelector("#rock");
let paperButton = document.querySelector("#paper");
let scissorsButton = document.querySelector("#scissors");
let playAgainButton = document.querySelector("#play-again-button");

let event = new CustomEvent("gameEnd");

choices.addEventListener('click', (e) => {
    let target = e.target;

    let validChoices = ['rock', 'paper', 'scissors'];
    let playerChoice;

    if (validChoices.includes(target.id)) {
        playerChoice = e.target.id;
    } else {
        return;
    }  

    let computerChoice = getComputerChoice();
    let outcome = playRound(computerChoice, playerChoice);

    if (outcome === 'win') {
        results.textContent = `You Win! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}.`;
        playerScoreboard.textContent = ++playerScore;
    } else if (outcome === 'lose') {
        results.textContent = `You lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}.`;
        computerScoreboard.textContent = ++computerScore;
    } else {
        results.textContent = `It's a tie! You both chose ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}.`
    }

    if (computerScore === 5 || playerScore === 5) {
        rockButton.style.display = "none";
        paperButton.style.display = "none";
        scissorsButton.style.display = "none";
        playAgainButton.style.display = "initial";

        results.textContent = (playerScore === 5) ? "Congrats! You won the game!": "You lost the game! Better luck next time!";
    }
})

playAgainButton.addEventListener('click', () => {
    rockButton.style.display = "initial";
    paperButton.style.display = "initial";
    scissorsButton.style.display = "initial";
    playAgainButton.style.display = "none";

    computerScore = 0;
    playerScore = 0;

    results.textContent = "Rock Paper Scissors!";
    playerScoreboard.textContent = playerScore;
    computerScoreboard.textContent = computerScore;
})

