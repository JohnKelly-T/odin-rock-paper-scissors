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

function playRound(computerChoice, humanChoice) {

    if (humanChoice === "Invalid option") {
        console.log("Invalid option inputted");
        return "invalid";
    }

    if (humanChoice === "cancelled") {
        console.log("Player canceled");
        return "cancelled";
    }
    
    let outcome;
    
    if (computerChoice === humanChoice) {
        outcome = "tie";
    } else if (computerChoice === "rock" && humanChoice === "scissors"
        || computerChoice === "paper" && humanChoice === "rock"
        || computerChoice === "scissors" && humanChoice === "paper"
    ) {
        outcome = "lose";
    }
    else {
        outcome = "win";
    }

    if (outcome === "tie") {
        console.log(`It's a tie! Both chose ${humanChoice}`)
    } else if (outcome === "win") {
        console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    }

    return outcome;
}


let cpuScore = 0;
let humanScore = 0;

let choices = document.querySelector(".choices-container");
let results = document.querySelector(".results");
let humanScoreboard = document.querySelector(".human-score");
let cpuScoreboard = document.querySelector(".computer-score");

let rockButton = document.querySelector("#rock");
let paperButton = document.querySelector("#paper");
let scissorsButton = document.querySelector("#scissors");
let playAgainButton = document.querySelector("#play-again-button");

let event = new CustomEvent("gameEnd");

choices.addEventListener('click', (e) => {
    let target = e.target;

    let validChoices = ['rock', 'paper', 'scissors'];
    let humanChoice;

    if (validChoices.includes(target.id)) {
        humanChoice = e.target.id;
    } else {
        return;
    }  

    let cpuChoice = getComputerChoice();
    let result = playRound(cpuChoice, humanChoice);

    if (result === 'win') {
        results.textContent = `You Win! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${cpuChoice.charAt(0).toUpperCase() + cpuChoice.slice(1)}.`;
        humanScoreboard.textContent = ++humanScore;
    } else if (result === 'lose') {
        results.textContent = `You lose! ${cpuChoice.charAt(0).toUpperCase() + cpuChoice.slice(1)} beats ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)}.`;
        cpuScoreboard.textContent = ++cpuScore;
    } else {
        results.textContent = `It's a tie! You both chose ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)}.`
    }

    if (cpuScore === 5 || humanScore === 5) {
        rockButton.style.display = "none";
        paperButton.style.display = "none";
        scissorsButton.style.display = "none";
        playAgainButton.style.display = "initial";

        results.textContent = (humanScore === 5) ? "Congrats! You won the game!": "You lost the game! Better luck next time!";
    }
})

playAgainButton.addEventListener('click', () => {
    rockButton.style.display = "initial";
    paperButton.style.display = "initial";
    scissorsButton.style.display = "initial";
    playAgainButton.style.display = "none";

    cpuScore = 0;
    humanScore = 0;

    results.textContent = "Rock Paper Scissors!";
    humanScoreboard.textContent = humanScore;
    cpuScoreboard.textContent = cpuScore;
})

