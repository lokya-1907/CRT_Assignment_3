const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const palette = document.getElementById('palette');
const colors = [
  '#e74c3c', // red
  '#27ae60', // green
  '#3498db', // blue
  '#f1c40f', // yellow
  '#9b59b6', // purple
  '#000000', // black
  '#ffffff'  // eraser
];
let currentColor = colors[0];
let drawing = false;

// Palette UI
colors.forEach(color => {
  const btn = document.createElement('div');
  btn.className = 'color';
  btn.style.background = color;
  if (color === currentColor) btn.classList.add('selected');
  btn.onclick = () => {
    currentColor = color;
    document.querySelectorAll('.palette .color').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
  };
  palette.appendChild(btn);
});

// Drawing events
canvas.addEventListener('mousedown', e => { drawing = true; draw(e); });
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 7, 0, 2 * Math.PI);
  ctx.fillStyle = currentColor;
  ctx.globalCompositeOperation = (currentColor === '#ffffff') ? 'destination-out' : 'source-over';
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

// Clear button
document.getElementById('clearBtn').onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Game logic
const words = ['apple', 'cat', 'car', 'tree', 'banana', 'house', 'dog', 'fish', 'sun', 'flower', 'star', 'cup', 'book', 'cloud', 'leaf'];
let answer = '';
let timer = null;
let time = 60;
let score = 0;
let running = false;

function setWord() {
  answer = words[Math.floor(Math.random() * words.length)];
  document.getElementById('drawWord').textContent = answer;
}

function startGame() {
  if (running) return;
  running = true;
  setWord();
  time = 60;
  document.getElementById('timer').textContent = `Time: ${time}s`;
  document.getElementById('guessInput').disabled = false;
  document.getElementById('message').textContent = '';
  timer = setInterval(() => {
    time--;
    document.getElementById('timer').textContent = `Time: ${time}s`;
    if (time <= 0) endGame(false);
  }, 1000);
}

function stopGame() {
  running = false;
  clearInterval(timer);
}

function resetGame() {
  stopGame();
  score = 0;
  document.getElementById('score').textContent = `Score: ${score}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setWord();
  document.getElementById('timer').textContent = `Time: 60s`;
  document.getElementById('guessInput').disabled = false;
  document.getElementById('message').textContent = '';
}

function endGame(won) {
  stopGame();
  document.getElementById('guessInput').disabled = true;
  document.getElementById('message').textContent = won
    ? `🎉 Correct! The word was "${answer}".`
    : `⏰ Time's up! The word was "${answer}".`;
}

document.getElementById('startBtn').onclick = startGame;
document.getElementById('stopBtn').onclick = stopGame;
document.getElementById('resetBtn').onclick = resetGame;

// Guess logic
document.getElementById('guessForm').onsubmit = e => {
  e.preventDefault();
  if (!running) return;
  const guess = document.getElementById('guessInput').value.trim().toLowerCase();
  if (guess === answer) {
    score += 10;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('message').textContent = "🎉 Correct! New word!";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setWord();
    document.getElementById('guessInput').value = '';
    time = 60;
    document.getElementById('timer').textContent = `Time: ${time}s`;
  } else {
    score -= 5;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('message').textContent = "❌ Try again!";
    document.getElementById('guessInput').value = '';
  }
};