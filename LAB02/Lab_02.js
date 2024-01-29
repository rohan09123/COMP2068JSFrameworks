const prompt = require('prompt');

// Function to get user input
function getUserSelection() {
  return new Promise((resolve, reject) => {
    console.log("Enter 'Rock' | 'Paper' | 'Scissors' | 'Close'");
    prompt.get(['userSelection'], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.userSelection.toUpperCase());
      }
    });
  });
}

// Function to generate computer selection
function getComputerSelection() {
  const randomValue = Math.random();

  if (randomValue <= 0.34) {
    return 'PAPER';
  } else if (randomValue <= 0.67) {
    return 'SCISSORS';
  } else {
    return 'ROCK';
  }
}

// Function to determine the winner
function determineWinner(userSelection, computerSelection) {
  if (userSelection === computerSelection) {
    return "It's a tie";
  } else if (
    (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
    (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
  ) {
    return 'User Wins';
  } else {
    return 'Computer Wins';
  }
}

// Main game logic
async function playGame() {
  prompt.start();

  while (true) {
    try {
      const userSelection = await getUserSelection();

      if (userSelection === 'CLOSE') {
        console.log('Game closed by the user.');
        break;
      }

      if(userSelection != "ROCK" || userSelection != "PAPER" || userSelection != "SCISSORS")
      {
        console.log('Wrong input');
        continue;
      }


      const computerSelection = getComputerSelection();

      console.log(`User Selection: ${userSelection}`);
      console.log(`Computer Selection: ${computerSelection}`);

      const result = determineWinner(userSelection, computerSelection);
      console.log(`Outcome: ${result}`);
    } catch (error) {
      console.error('Error getting user input:', error);
    }
  }
}

// Run the game
playGame();
