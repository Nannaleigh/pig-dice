const startGame = document.getElementById("startgame");
const gameControl = document.getElementById("gamecontrol");
const game = document.getElementById("game");
const score = document.getElementById("score");
const actionArea = document.getElementById("actions");

const gameData = {
  dice: [
    "1die.jpg",
    "2die.jpg",
    "3die.jpg",
    "4die.jpg",
    "5die.jpg",
    "6die.jpg",
  ],
  players: ["player 1", "player 2"],
  score: [0, 0],
  roll1: 0,
  roll2: 0,
  rollSum: 0,
  index: 0,
  gameEnd: 29,
};

startGame.addEventListener("click", function () {
  gameData.index = Math.round(Math.random());
  gameControl.innerHTML = "<h2> The game has started</h2>";
  gameControl.innerHTML += "<button id='quit'>Do you want to quit?</button";

  document.getElementById("quit").addEventListener("click", function () {
    location.reload();
  });

  console.log(gameData.index);
  setUpTurn();
});

function setUpTurn() {
  game.innerHTML = `<p>Roll the dice for the ${
    gameData.players[gameData.index]
  }</p>`;
  actionArea.innerHTML = '<button id="roll"> Roll the Dice</button>';
  document.getElementById("roll").addEventListener("click", function () {
    throwDice();
  });
}

function throwDice() {
  actionArea.innerHTML = " ";
  gameData.roll1 = Math.floor(Math.random() * 6) + 1;
  gameData.roll2 = Math.floor(Math.random() * 6 + 1);
  game.innerHTML = `<p> Roll the dice for the ${
    gameData.players[gameData.index]
  }</p>`;
  game.innerHTML += `<img src ="${gameData.dice[gameData.roll1 - 1]}">`;
  game.innerHTML += `<img src ="${gameData.dice[gameData.roll2 - 1]}">`;
  gameData.rollSum = gameData.roll1 + gameData.roll2;

  if (gameData.rollSum === 2) {
    game.innerHTML += "<p>Oh Snap! Snake Eyes!</p>";
    gameData.score[gameData.index] = 0;
    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    // Show the Current Score
    showCurrentScore();
    setTimeout(setUpTurn, 2000);
    console.log("snake eyes");
  } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${
      gameData.players[gameData.index]
    }</p>`;
    setTimeout(setUpTurn, 2000);
    console.log("A one was rolled. Your turn is over");
  } else {
    gameData.score[gameData.index] =
      gameData.score[gameData.index] + gameData.rollSum;
    actionArea.innerHTML =
      '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

    document.getElementById("rollagain").addEventListener("click", function () {
      throwDice();
    });

    document.getElementById("pass").addEventListener("click", function () {
      setUpTurn();
    });
    console.log("The game continues. Roll again or pass.");
    checkWinningCondition();
  }
}

function checkWinningCondition() {
  if (gameData.score[gameData.index] > gameData.gameEnd) {
    score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${
      gameData.score[gameData.index]
    }!</h2>`;
    actionArea.innerHTML = "";
    document.getElementById("quit").innerHTML = "<p>Start a new game?</p>";
  }
  //show current score...
  else showCurrentScore();
}

function showCurrentScore() {
  score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} is ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} is ${gameData.score[1]}</strong></p>`;
}
