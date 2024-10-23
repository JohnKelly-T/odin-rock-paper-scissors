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

function getHumanChoice() {
    let choice = prompt("Rock, Paper, Scissors!")

    if (choice === null) {
        return "cancelled";
    }
    // convert to lowercase
    choice = choice.toLowerCase();

    if (choice === "rock" || choice === "paper" || choice === "scissors") {
        return choice;
    } else {
        alert("Invalid option");
        return "Invalid option";
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

function playGame(rounds) {
    let humanScore = 0;
    let computerScore = 0;
    let result;

    for (let i = 0; i < rounds; i++) {
        result = playRound(getComputerChoice(), getHumanChoice());

        if (result === "invalid" || result === "cancelled") {
            // reset round
            i--;
            continue;
        } else if (result === "win") {
            humanScore++;
        } else if (result === "lose") {
            computerScore++;
        }

        // print current score
        console.log(`Current score:\ncpu:${computerScore} player:${humanScore}`)
    }

    // evaluate final winner
    if (humanScore > computerScore) {
        console.log("*** Congrats! You are the overall winner! ***");
    } else if (computerScore > humanScore) {
        console.log("*** Cpu wins! Better Luck next time! ***");
    } else if (computerScore === humanScore) {
        console.log("*** Nobody wins the whole game! It's a tie! ***");
    }
}



let cpuScore = 0;
let humanScore = 0;

let choices = document.querySelector(".choices-container");

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
    let result;

    result = playRound(cpuChoice, humanChoice);

    let results = document.querySelector(".results");

    if (result === 'win') {
        results.textContent = `Congrats! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${cpuChoice.charAt(0).toUpperCase() + cpuChoice.slice(1)}`;
        humanScore++;
    } else {
        results.textContent = `Too bad, ${cpuChoice.charAt(0).toUpperCase() + cpuChoice.slice(1)} beats ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)}`;
        cpuScore++;
    }
})

