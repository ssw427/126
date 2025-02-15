// 获取 DOM 元素
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('scoreText');
const highScoreText = document.getElementById('highScoreText');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const difficultySelect = document.getElementById('difficulty');
const eatSound = document.getElementById('eatSound');
const gameOverSound = document.getElementById('gameOverSound');

// 游戏配置
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let gameSpeed = 100;
let isPaused = false;
let highScore = localStorage.getItem('snakeHighScore') || 0;
highScoreText.textContent = highScore; 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('scoreText');
const startButton = document.getElementById('startButton');

// 设置游戏难度
difficultySelect.addEventListener('change', () => {
    switch(difficultySelect.value) {
        case 'easy':
            gameSpeed = 120;
            break;
        case 'normal':
            gameSpeed = 100;
            break;
        case 'hard':
            gameSpeed = 80;
            break;
    }
    if (gameRunning) {
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
    }
});

// 暂停功能
pauseButton.addEventListener('click', togglePause);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        togglePause();
    }
});

function togglePause() {
    if (!gameRunning) return;
    
    if (isPaused) {
        gameInterval = setInterval(gameLoop, gameSpeed);
        pauseButton.textContent = '暂停';
    } else {
        clearInterval(gameInterval);
        pauseButton.textContent = '继续';
    }
    isPaused = !isPaused;
}

// 设置游戏难度
difficultySelect.addEventListener('change', () => {
    switch(difficultySelect.value) {
        case 'easy':
            gameSpeed = 120;
            break;
        case 'normal':
            gameSpeed = 100;
            break;
        case 'hard':
            gameSpeed = 80;
            break;
    }
    if (gameRunning) {
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
    }
});

// 暂停功能
pauseButton.addEventListener('click', togglePause);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        togglePause();
    }
});

function togglePause() {
    if (!gameRunning) return;
    
    if (isPaused) {
        gameInterval = setInterval(gameLoop, gameSpeed);
        pauseButton.textContent = '暂停';
    } else {
        clearInterval(gameInterval);
        pauseButton.textContent = '继续';
    }
    isPaused = !isPaused;
}

// 更新 checkFood 函数
function checkFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        eatSound.play();
        score += 10;
        scoreText.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreText.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        food = generateFood();
        return true;
    }
    return false;
}

// 更新 endGame 函数
function endGame() {
    gameOverSound.play();
    clearInterval(gameInterval);
    gameRunning = false;
    startButton.textContent = '开始游戏';
    alert(`游戏结束！\n当前得分：${score}\n最高分：${highScore}`);
}
// 移动端控制
document.getElementById('upButton').addEventListener('click', () => {
    if (dy !== 1 && !isPaused) { dx = 0; dy = -1; }
});
document.getElementById('downButton').addEventListener('click', () => {
    if (dy !== -1 && !isPaused) { dx = 0; dy = 1; }
});
document.getElementById('leftButton').addEventListener('click', () => {
    if (dx !== 1 && !isPaused) { dx = -1; dy = 0; }
});
document.getElementById('rightButton').addEventListener('click', () => {
    if (dx !== -1 && !isPaused) { dx = 1; dy = 0; }
});
// 移动端控制
document.getElementById('upButton').addEventListener('click', () => {
    if (dy !== 1 && !isPaused) { dx = 0; dy = -1; }
});
document.getElementById('downButton').addEventListener('click', () => {
    if (dy !== -1 && !isPaused) { dx = 0; dy = 1; }
});
document.getElementById('leftButton').addEventListener('click', () => {
    if (dx !== 1 && !isPaused) { dx = -1; dy = 0; }
});
document.getElementById('rightButton').addEventListener('click', () => {
    if (dx !== -1 && !isPaused) { dx = 1; dy = 0; }
});
// 设置画布大小
canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;
let gameRunning = false;

// 开始游戏
function startGame() {
    if (gameRunning) return;
    
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    dx = 0;
    dy = 0;
    score = 0;
    scoreText.textContent = score;
    gameRunning = true;
    gameInterval = setInterval(gameLoop, 100);
    startButton.textContent = '重新开始';
}

// 生成食物
function generateFood() {
    return {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

// 游戏主循环
function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        endGame();
        return;
    }
    checkFood();
    draw();
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (!checkFood()) {
        snake.pop();
    }
}

// 检查碰撞
function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

// 检查是否吃到食物
function checkFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreText.textContent = score;
        food = generateFood();
        return true;
    }
    return false;
}

// 绘制游戏画面
function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// 结束游戏
function endGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    startButton.textContent = '开始游戏';
    alert(`游戏结束！得分：${score}`);
}

// 键盘控制
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

startButton.addEventListener('click', startGame);
// 音效和音乐控制
const bgMusic = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');
const musicToggle = document.getElementById('musicToggle');

// 音效控制
soundToggle.addEventListener('change', () => {
    eatSound.muted = !soundToggle.checked;
    gameOverSound.muted = !soundToggle.checked;
});

// 背景音乐控制
musicToggle.addEventListener('change', () => {
    if (musicToggle.checked) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});

// 更新开始游戏函数
function startGame() {
    if (gameRunning) return;
    
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    dx = 0;
    dy = 0;
    score = 0;
    scoreText.textContent = score;
    gameRunning = true;
    gameInterval = setInterval(gameLoop, gameSpeed);
    startButton.textContent = '重新开始';
    
    // 如果音乐开关打开，开始播放背景音乐
    if (musicToggle.checked) {
        bgMusic.play();
    }
}

// 更新结束游戏函数
function endGame() {
    gameOverSound.play();
    clearInterval(gameInterval);
    gameRunning = false;
    startButton.textContent = '开始游戏';
    bgMusic.pause();
    bgMusic.currentTime = 0;
    alert(`游戏结束！\n当前得分：${score}\n最高分：${highScore}`);
}