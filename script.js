let grid = [];
let mines = [];
let stars = [];
let betAmount = 10;  // Exemplo de aposta inicial
let currentMultiplier = 1;  // Multiplicador
let isGameActive = false;

document.getElementById("startGameBtn").addEventListener("click", startGame);

function startGame() {
    let minesCount = document.querySelector('.mineOption.selected')?.getAttribute('data-mines') || 3;
    grid = Array(25).fill(null);  // Cria um grid de 25 células (5x5)
    mines = [];
    stars = [];
    isGameActive = true;

    // Adiciona as minas e estrelas ao grid (exemplo de aleatoriedade)
    for (let i = 0; i < minesCount; i++) {
        let randIndex = Math.floor(Math.random() * grid.length);
        if (!mines.includes(randIndex)) {
            mines.push(randIndex);
        }
    }

    // Adiciona uma estrela em uma posição aleatória
    let starIndex = Math.floor(Math.random() * grid.length);
    stars.push(starIndex);

    renderGrid();
    showGameScreen();
}

function renderGrid() {
    const gridContainer = document.querySelector('.grid');
    gridContainer.innerHTML = '';

    grid.forEach((cell, index) => {
        let cellDiv = document.createElement('div');
        cellDiv.dataset.index = index;
        cellDiv.addEventListener('click', () => handleCellClick(index));
        gridContainer.appendChild(cellDiv);
    });
}

function handleCellClick(index) {
    if (!isGameActive) return;

    // Se a célula for uma mina
    if (mines.includes(index)) {
        revealAll();
        alert("Você perdeu! Tente novamente.");
    } else {
        // Se a célula for uma estrela
        if (stars.includes(index)) {
            currentMultiplier *= 2;
            document.getElementById("multiplier").innerText = `${currentMultiplier}x`;
        }
        document.querySelector(`[data-index='${index}']`).classList.add('revealed');
    }
}

function revealAll() {
    isGameActive = false;
    // Revela todas as células
    mines.forEach((mineIndex) => {
        document.querySelector(`[data-index='${mineIndex}']`).classList.add('mine');
    });
    stars.forEach((starIndex) => {
        document.querySelector(`[data-index='${starIndex}']`).classList.add('star');
    });
}

document.getElementById("cashOutBtn").addEventListener("click", () => {
    alert(`Você sacou ${betAmount * currentMultiplier} moedas!`);
    isGameActive = false;
    resetGame();
});

function resetGame() {
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.intro').style.display = 'block';
}
