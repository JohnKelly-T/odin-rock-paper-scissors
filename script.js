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

function updateChoiceImage(computerChoice = "default", playerChoice = "default") {
    let computerImage = document.querySelector("#computer-choice-img");
    let playerImage = document.querySelector("#player-choice-img");

    if (computerChoice === "default") {
        computerImage.src = "./img/rock-front.png";
        playerImage.src = "./img/rock-back.png";

        computerImage.style.cssText = "filter: saturate(0)"; 
        playerImage.style.cssText = "filter: saturate(0)";
    } else {
        computerImage.src = `./img/${computerChoice}-front.png`;
        playerImage.src = `./img/${playerChoice}-back.png`;

        computerImage.style.cssText = "filter: saturate(1)"; 
        playerImage.style.cssText = "filter: saturate(1)";
    }
}

function updateHealthbar() {
    let playerHealthbar = document.querySelector("#player-healthbar");
    let computerHealthbar = document.querySelector("#computer-healthbar");
    
    computerHealthbar.style.cssText = `width: ${(5 - playerScore) * 20}%;`;
    playerHealthbar.style.cssText = `width: ${(5 - computerScore) * 20}%;`;

    if (playerScore > 3) {
        computerHealthbar.style.backgroundColor = "#FF3939";
    } else if (playerScore > 1) {
        computerHealthbar.style.backgroundColor = "#FFCA39";
    } else {
        computerHealthbar.style.backgroundColor = "#40FF39";
    }

    if (computerScore > 3) {
        playerHealthbar.style.backgroundColor = "#FF3939";
    } else if (computerScore > 1) {
        playerHealthbar.style.backgroundColor = "#FFCA39";
    } else {
        playerHealthbar.style.backgroundColor = "#40FF39";
    }

    
}

let computerScore = 0;
let playerScore = 0;

let choices = document.querySelector(".choices-container");
let results = document.querySelector(".result-text");

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

    results.style.cssText = "font-size: 20px;";

    updateChoiceImage(computerChoice, playerChoice);

    if (outcome === 'win') {
        results.textContent = `You Win! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}.`;
        playerScore++;
    } else if (outcome === 'lose') {
        results.textContent = `You lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}.`;
        computerScore++;
    } else {
        results.textContent = `It's a tie! You both chose ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}.`
    }

    if (computerScore === 5 || playerScore === 5) {
        rockButton.style.display = "none";
        paperButton.style.display = "none";
        scissorsButton.style.display = "none";
        playAgainButton.style.display = "initial";

        results.textContent = (playerScore === 5) ? "Congrats! You won the game!": "You lost the game! Better luck next time!";
        document.querySelector(".choices-text").style.cssText = "display: none";
    }

    updateHealthbar();
})

playAgainButton.addEventListener('click', () => {
    rockButton.style.display = "initial";
    paperButton.style.display = "initial";
    scissorsButton.style.display = "initial";
    playAgainButton.style.display = "none";

    document.querySelector(".choices-text").style.cssText = "display: initial";

    computerScore = 0;
    playerScore = 0;

    results.style.cssText = "font-size: 32px;";
    results.textContent = "Rock Paper Scissors!";
    updateChoiceImage();
    updateHealthbar();
})

