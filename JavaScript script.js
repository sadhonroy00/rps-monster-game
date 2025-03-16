
let score = 0;
let visibilityTime = 5000; // Initial visibility time in milliseconds
let rankerBoard = [];

const monsterArea = document.getElementById('monster-area');
const scoreDisplay = document.getElementById('score');
const rankerList = document.getElementById('ranker-list');

const skills = {
  rock: document.getElementById('rock'),
  paper: document.getElementById('paper'),
  scissors: document.getElementById('scissors')
};

const monsters = ['rock', 'paper', 'scissors'];

// Function to create a monster
function createMonster() {
  const monsterType = monsters[Math.floor(Math.random() * monsters.length)];
  const monster = document.createElement('div');
  monster.classList.add('monster');
  monster.textContent = monsterType.toUpperCase();
  monster.style.left = `${Math.random() * (monsterArea.offsetWidth - 50)}px`;
  monster.style.top = `${Math.random() * (monsterArea.offsetHeight - 50)}px`;
  monster.dataset.type = monsterType;

  monster.addEventListener('click', () => killMonster(monster));
  monsterArea.appendChild(monster);

  setTimeout(() => {
    if (monster.parentElement) {
      monster.remove();
    }
  }, visibilityTime);
}

// Function to kill a monster
function killMonster(monster) {
  const monsterType = monster.dataset.type;
  const skillUsed = Object.keys(skills).find(skill => skills[skill].classList.contains('active'));

  if (
    (skillUsed === 'rock' && monsterType === 'scissors') ||
    (skillUsed === 'paper' && monsterType === 'rock') ||
    (skillUsed === 'scissors' && monsterType === 'paper')
  ) {
    const timeLeft = visibilityTime - (Date.now() - monster.dataset.createdAt);
    const points = Math.max(1, Math.min(3, Math.ceil(timeLeft / 1000)));
    score += points;
    scoreDisplay.textContent = score;
    monster.remove();
    updateVisibilityTime();
  }
}

// Function to update visibility time based on score
function updateVisibilityTime() {
  visibilityTime = Math.max(1000, 5000 - score * 100); // Decrease visibility time as score increases
}

// Event listeners for skills
Object.keys(skills).forEach(skill => {
  skills[skill].addEventListener('click', () => {
    Object.keys(skills).forEach(s => skills[s].classList.remove('active'));
    skills[skill].classList.add('active');
  });
});

// Function to update ranker board
function updateRankerBoard() {
  rankerList.innerHTML = rankerBoard
    .sort((a, b) => b.score - a.score)
    .map(player => `<li>${player.name}: ${player.score}</li>`)
    .join('');
}

// Game loop to create monsters
setInterval(createMonster, 2000);

// Example: Add a player to the ranker board
rankerBoard.push({ name: 'Player1', score: 0 });
updateRankerBoard();