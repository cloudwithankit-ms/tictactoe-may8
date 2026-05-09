let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function updateStatus() {
    const statusEl = document.getElementById('status');
    const winner = checkWinner();
    
    if (winner) {
        statusEl.textContent = `Player ${winner} wins!`;
        gameActive = false;
    } else if (checkDraw()) {
        statusEl.textContent = "It's a draw!";
        gameActive = false;
    } else {
        statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    
    if (board[index] !== '' || !gameActive) return;
    
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    
    updateStatus();
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

updateStatus();