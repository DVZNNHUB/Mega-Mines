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
    }, 3000); // A tela de carregamento será exibida por 3 segundos
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
    const
