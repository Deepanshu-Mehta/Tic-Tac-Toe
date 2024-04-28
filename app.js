// add code here
gameBoard.style.width = '100vw';
gameBoard.style.justifyContent = 'center';

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.style.border = '2px solid black';
});

const restartButton = document.getElementById('restartButton');
restartButton.style.marginTop = '20px';
restartButton.style.padding = '5px';

const undoButton = document.createElement('undoButton'); 
undoButton.textContent = 'Undo';
undoButton.style.marginTop = '20px';
undoButton.style.padding = '5px';
undoButton.style.marginLeft = '10px'; 
gameBoard.insertAdjacentElement('afterend', undoButton); 

undoButton.id = 'undoButton';

let currentPlayer = 'X';
let moveHistory = [];

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            const grid = getGridState();
            const winner = checkAllRowsColumnsDiagonals(grid);
            if (winner) {
                alert(`${winner} wins!`);
            } else if (checkForDraw(grid)) {
                alert("It's a draw!");
            }
            moveHistory.push(cell); 
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

restartButton.addEventListener('click', restartGame);

undoButton.addEventListener('click', undoMove); 

function getGridState() {
    let grid = [];
    cells.forEach(cell => {
        grid.push(cell.textContent.trim());
    });
    return grid;
}

function checkForDraw(grid) {
    if (grid.every(cell => cell.trim() !== '')) {
        if (!checkAllRowsColumnsDiagonals(grid)) {
            return true;
        }
    }
    return false;
}

function checkAllRowsColumnsDiagonals(grid) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
            return grid[a]; 
        }
    }
    return null; 
}

function showFinalBoardState() {
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none'; 
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    currentPlayer = 'X';
    moveHistory = [];
}

function undoMove() {
    if (moveHistory.length > 0) {
        const lastMove = moveHistory.pop(); 
        lastMove.textContent = ''; 
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    }
}