const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field = [];
let KREST = true;
let steps = 0;
let winnerKletki = [];

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {

    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        field[i] = []
        for (let j = 0; j < dimension; j++) {
            field[i][j] = EMPTY;
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (field[row][col] === EMPTY){
        if (KREST) {
            renderSymbolInCell(CROSS, row, col);
            field[row][col] = CROSS
        }
        else {
            renderSymbolInCell(ZERO, row, col);
            field[row][col] = ZERO
        }
        let curr = field[row][col];

        KREST = !KREST;
        steps += 1;
    }

    console.log(winnerKletki);

    whoWin();

    let flag = false;
    if (winnerKletki.length === 3) {
        for (let kletka of winnerKletki) {
            findCell(kletka[0], kletka[1]).style.color = "#900"
        }
        function fanc() { alert(`Победил CROSS`) }
        setTimeout(fanc, 100)
        flag = true;
    }


    if (flag === false && steps === field.length * field.length) {
        function func() { alert("Победила дружба"); }
        setTimeout(func, 100)
    }


    console.log(KREST);
    console.log(`Clicked on cell: ${row}, ${col}`);

}

function whoWin() {
    if (field[0][0] === field[0][1] && field[0][1] === field[0][2]
        && field[0][0] !== EMPTY) {
        //return matrix[0][0];
        winnerKletki=([0, 0], [0, 1], [0, 2]);
    }
    else if (field[1][0] === field[1][1] && field[1][1] === field[1][2]
        && field[1][0] !== EMPTY) {
        winnerKletki=[[1, 0], [1, 1], [1, 2]];
    }
    else if (field[2][0] === field[2][1] && field[2][1] === field[2][2]
        && field[2][0] !== EMPTY) {
        winnerKletki=[[2, 0], [2, 1], [2, 2]];
    }

    else if (field[0][0] === field[1][0] && field[1][0] === field[2][0]
        && field[0][0] !== EMPTY) {
        winnerKletki=[[0, 0], [1, 0], [2, 0]];
    }
    else if (field[0][1] === field[1][1] && field[1][1]  === field[2][1]
        && field[1][1] !== EMPTY) {
        winnerKletki=[[0, 1], [1, 1], [2, 1]];
    }
    else if (field[0][2] === field[1][2] && field[1][2] === field[2][2]
        && field[2][2] !== EMPTY) {
        winnerKletki=[[0, 2], [1, 2], [2, 2]];
    }

    else if (field[0][0] === field[1][1] && field[1][1] === field[2][2]
        && field[2][2] !== EMPTY) {
        winnerKletki=[[0, 0], [1, 1], [2, 2]];
    }

    else if (field[0][2] === field[1][1] && field[1][1] === field[2][0]
        && field[0][2] !== EMPTY) {
        winnerKletki=[[0, 2], [1, 1], [2, 0]];
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    const CROSS = 'X';
    const ZERO = 'O';
    const EMPTY = ' ';
    let field = [];
    let KREST = true;
    let steps = 0;
    let winnerKletki = [];
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
