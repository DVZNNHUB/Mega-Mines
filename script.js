// Variáveis globais
let minesSelected = 0;
let multiplier = 1;
let gameStarted = false;
let revealedCells = 0;
let totalCells = 25; // Grid de 5x5

document.getElementById('startGameBtn').addEventListener('click', startGame);
document.querySelectorAll('.mineOption').forEach(button => {
    button.addEventListener('click', selectMines);
});

function startGame() {
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
    document.querySelector('.grid').style.opacity = 0; // Inicializa invisível
    setTimeout(generateGrid, 500); // Cria o grid após animação de fade
    gameStarted = true;
    revealedCells = 0;
}

function selectMines(event) {
    minesSelected = parseInt(event.target.dataset.mines);
    multiplier = (6 - minesSelected); // Mais minas = menor multiplicador
    document.getElementById('multiplier').textContent = `${multiplier}x`;
}

function generateGrid() {
    const grid = document.querySelector('.grid');
    grid.innerHTML = ''; // Limpar grid anterior
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => revealCell(cell, i));
        grid.appendChild(cell);
    }
    placeMines();
    grid.style.opacity = 1; // Anima o grid após sua criação
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
    if (cell.classList.contains('revealed')) return; // Não clicar de novo

    cell.classList.add('revealed');
    revealedCells++;

    if (cell.classList.contains('mine')) {
        cell.classList.add('mine');
        cell.style.animation = 'explode 0.5s ease forwards'; // Animação de explosão
        setTimeout(() => {
            alert(`Você perdeu! Você encontrou uma mina!`);
            resetGame();
        }, 500);
    } else {
        // O jogador não encontrou mina, continua
        if (revealedCells === totalCells - minesSelected) {
            cell.classList.add('safe');
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

document.getElementById('cashOutBtn').addEventListener('click', () => {
    alert(`Você sacou seu prêmio de: ${multiplier * 10} créditos`);
    resetGame();
});
