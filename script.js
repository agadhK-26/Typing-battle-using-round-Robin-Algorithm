const startBtn = document.getElementById("startGame");
const gameDiv = document.getElementById("game");
const setupDiv = document.getElementById("setup");
const scoreboardDiv = document.getElementById("scoreboard");
const wordDisplay = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const submitWord = document.getElementById("submitWord");
const turnInfo = document.getElementById("turnInfo");
const roundInfo = document.getElementById("roundInfo");
const resultDiv = document.getElementById("result");
const scoresList = document.getElementById("scoresList");

let players = [];
let scores = {};
let words = ["round", "robin", "schedule", "typing", "battle", "game", "coding", "winner", "fast", "keyboard"];
let round = 1;
let maxRounds = 4;
let turn = 0;
let currentWord = "";

startBtn.addEventListener("click", () => {
  const inputNames = document.getElementById("playerNames").value.trim();
  if (!inputNames) {
    alert("Enter player names!");
    return;
  }
  players = inputNames.split(",").map(name => name.trim());
  players.forEach(p => scores[p] = 0);
  
  setupDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");
  
  nextTurn();
});

function nextTurn() {
  if (round > maxRounds) {
    endGame();
    return;
  }

  turnInfo.textContent = `${players[turn]}'s turn`;
  roundInfo.textContent = `Round ${round}`;
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = currentWord;
  wordInput.value = "";
  wordInput.disabled = false;
  resultDiv.textContent = "";
  wordInput.focus();
}

submitWord.addEventListener("click", () => {
  const typedWord = wordInput.value.trim().toLowerCase();
  wordInput.disabled = true;

  if (typedWord === currentWord.toLowerCase()) {
    resultDiv.innerHTML = `<span style="color:lightgreen;">✅ ${players[turn]} typed correctly!</span>`;
    scores[players[turn]]++;
  } else {
    resultDiv.innerHTML = `<span style="color:tomato;">❌ ${players[turn]} got it wrong!</span>`;
  }

  turn++;
  if (turn >= players.length) {
    turn = 0;
    round++;
  }

  setTimeout(() => nextTurn(), 1000);
});

function endGame() {
  gameDiv.classList.add("hidden");
  scoreboardDiv.classList.remove("hidden");
  scoresList.innerHTML = "";
  for (let p in scores) {
    let li = document.createElement("li");
    li.textContent = `${p}: ${scores[p]} points`;
    scoresList.appendChild(li);
  }
}
