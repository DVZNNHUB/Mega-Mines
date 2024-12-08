// Variáveis globais
let minesSelected = 0;
let multiplier = 1;
let gameStarted = false;
let revealedCells = 0;
let totalCells = 25; // Grid de 5x5

// Tela de carregamento
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.querySelector('.intro').style.display = 'block';
    }, 2000);
};

document.getElementById('startGameBtn').addEventListener('click', startGame);
document.querySelectorAll('.mineOption').forEach(button => {
    button.addEventListener('click', selectMines);
});

function startGame() {
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
    document.querySelector('.grid').style.opacity = 0;
    setTimeout(generateGrid, 500);
    gameStarted = true;
    revealedCells = 0;
}

function selectMines(event) {
    minesSelected = parseInt(event.target.dataset.mines);
    multiplier = (6 - minesSelected);
    document.getElementById('multiplier').textContent = `${multiplier}x`;
}

function generateGrid() {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => revealCell(cell, i));
        grid.appendChild(cell);
    }
    placeMines();
    grid.style.opacity = 1;
}

function placeMines() {
    const cells = document.querySelectorAll('.grid div');
    const mineIndices = [];

    while (mineIndices.length < minesSelected) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        if (!mineIndices.includes(randomIndex)) {
            mineIndices.push(randomIndex);
            cells[randomIndex].classList.add('mine');
        }
    }
}

function revealCell(cell, index) {
    if (cell.classList.contains('revealed')) return;

    cell.classList.add('revealed');
    revealedCells++;

    if (cell.classList.contains('mine')) {
        cell.classList.add('mine');
        setTimeout(() => {
            alert(`Você perdeu! Você encontrou uma mina!`);
            resetGame();
        }, 500);
    } else {
        if (revealedCells === totalCells - minesSelected) {
            setTimeout(() => {
                alert(`Você ganhou! Seu prêmio é: ${multiplier * 10} créditos`);
                resetGame();
            }, 500);
        }
    }
}

function resetGame() {
    gameStarted = false;
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.intro').style.display = 'block';
    document.querySelector('.grid').innerHTML = '';
}
