const squareList = [...document.getElementsByClassName(`square`)];
const newGameBtn = document.getElementById(`newGame`);
const gameInfo = document.getElementById(`gameInfo`);
const playerXpoints = document.querySelector(`.X`);
const playerOpoints = document.querySelector(`.O`);

let currentPlayer = `X`;
let isGameActive = true;

let board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const tie = () => {
    return board.find(element => element === ``) === undefined;
};

const isWinner = () => {
    for (let i = 0; i <= 7; i++) {
        const [num1, num2, num3] = winningConditions[i];
        const number1 = board[num1];
        const number2 = board[num2];
        const number3 = board[num3];

        if (number1 !== `` && number1 === number2 && number1 === number3) {
            isGameActive = false;
            currentPlayer = currentPlayer === `X` ? `O` : `X`;
            if (currentPlayer === `X`) {
                playerXpoints.innerText++;
                gameInfo.innerText = `Wygrał gracz ${currentPlayer}`
            } else {
                playerOpoints.innerText++;
                gameInfo.innerText = `Wygrał gracz ${currentPlayer}`
            };
            break;
        } else if (tie()) {
            isGameActive = false;
            gameInfo.innerText = `Remis!`;
        }
    };
};


squareList.forEach((square, index) => {

    square.addEventListener("click", (event) => {
        const {
            number
        } = event.target.dataset;

        if (isGameActive === true && board[number] === ``) {
            board[number] = currentPlayer;
            event.target.innerText = currentPlayer;
            currentPlayer = currentPlayer === `X` ? `O` : `X`;
            gameInfo.innerText = `Tura gracza ${currentPlayer}`;
            isWinner();
        };
    });
});



const startNewGame = () => {
    isGameActive = true;

    gameInfo.innerText = `Grę rozpoczyna X`

    currentPlayer = `X`;

    for (let i = 0; i < squareList.length; i++) {
        const square = squareList[i];
        square.innerText = ``;
    }

    for (let i = 0; i <= 8; i++) {
        board[i] = ``;
    }
};
newGameBtn.addEventListener(`click`, startNewGame);