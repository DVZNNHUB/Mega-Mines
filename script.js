document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startGame');
    const gameDiv = document.querySelector('.game');
    
    // Exemplo de como criar o tabuleiro de jogo (5x5 por exemplo)
    function createBoard() {
        let grid = '';
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                grid += `<div class="cell" id="cell-${i}-${j}" onclick="revealCell(${i}, ${j})"></div>`;
            }
        }
        gameBoard.innerHTML = grid;
    }

    // Função para iniciar o jogo
    startButton.addEventListener('click', () => {
        loadingScreen.style.display = 'none';  // Esconde a tela de carregamento
        gameDiv.style.display = 'block';  // Mostra a tela do jogo
        createBoard();  // Cria o tabuleiro de jogo
    });
    
    // Função para revelar a célula
    window.revealCell = (x, y) => {
        const cell = document.getElementById(`cell-${x}-${y}`);
        cell.style.backgroundColor = 'lightgray';  // Exemplo de mudança de cor
        // Aqui você pode adicionar a lógica de "mina" ou "estrela"
    };
});
