let gridSize = 5; // Tamanho do tabuleiro 5x5
let minePositions = []; // Posições das minas
let revealedCells = []; // Células reveladas
let isGameStarted = false; // Controle de estado do jogo

function startGame() {
    // Limpar o estado anterior
    minePositions = [];
    revealedCells = [];
    document.getElementById("statusMessage").textContent = "";
    document.getElementById("predictedMine").textContent = "Calculando...";
    isGameStarted = true;

    generateMines(); // Gerar minas

    // Criar o tabuleiro
    const gameGrid = document.getElementById("gameGrid");
    gameGrid.innerHTML = ''; // Limpar tabuleiro anterior
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("button");
        cell.textContent = "?";
        cell.classList.remove("mine", "safe");
        cell.addEventListener("click", () => checkMine(i, cell));
        gameGrid.appendChild(cell);
    }
}

function generateMines() {
    // Gerar posições de minas aleatórias
    while (minePositions.length < 3) { // Número de minas
        let randomPos = Math.floor(Math.random() * gridSize * gridSize);
        if (!minePositions.includes(randomPos)) {
            minePositions.push(randomPos);
        }
    }
}

function checkMine(index, cell) {
    if (!isGameStarted || revealedCells.includes(index)) return;

    revealedCells.push(index);
    // Se for uma mina
    if (minePositions.includes(index)) {
        cell.classList.add("mine");
        cell.textContent = "💣";
        document.getElementById("statusMessage").textContent = "Você acertou uma mina! Fim de jogo!";
        document.getElementById("startGame").textContent = "Reiniciar Jogo";
        isGameStarted = false;
    } else {
        cell.classList.add("safe");
        cell.textContent = "✓";
    }

    // Mostrar previsão de mina (simulação)
    predictMine();
}

function predictMine() {
    const randomIndex = minePositions[Math.floor(Math.random() * minePositions.length)];
    document.getElementById("predictedMine").textContent = `Previsão de mina: Posição ${randomIndex}`;
}