const game = (function () {
  // const gameBoard = [null, null, null, null, null, null, null, null, null];
  const gameBoard = [];
  let lastValidMove;

  const createBoard = (rows, cols) => {
    for (let i = 0; i < rows; i++) {
      gameBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        gameBoard[i].push(null);
      }
    }
  };
  const printBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      console.log(gameBoard[i].join(" | "));
      if (i < gameBoard.length - 1) {
        console.log("--------");
      }
    }
  };

  const getBoard = () => gameBoard;

  // const addToBoard = (index, value) => {
  //   const acceptedValues = ["X", "x", "O", "o"];
  //   if (!acceptedValues.includes(value)) {
  //     console.log("Wrong input");
  //     return;
  //   }
  //   if (index < 1 || index > 9) {
  //     console.log("Not in grid!");
  //     return;
  //   }

  //   const boardIndex = index - 1;
  //   if (gameBoard.at(boardIndex)) {
  //     console.log("Already at index!");
  //     return;
  //   }

  //   gameBoard.splice(boardIndex, 1, value);
  // };

  const addToBoard = (row, col, value) => {
    const acceptedValues = ["X", "x", "O", "o"];

    if (row < 1 || row > 9 || col < 1 || col > 9) {
      console.log("Invalid move!");
      return;
    }

    if (!acceptedValues.includes(value)) {
      console.log("Wrong input!");
      return;
    }

    const gameRow = row - 1;
    const gameCol = col - 1;

    if (gameBoard[gameRow][gameCol] !== null) {
      console.log("Space occupied!");
      return;
    }

    gameBoard[gameRow][gameCol] = value;
    // make lastValidMove an object incase i need the x and y value
    // lastValidMove = { row: gameRow, col: gameCol, value: value };
    lastValidMove = value;
  };

  // const getLastValidMove = () => lastValidMove.value;
  const getLastValidMove = () => lastValidMove;
  return {
    gameBoard,
    createBoard,
    getBoard,
    printBoard,
    addToBoard,
    getLastValidMove,
  };
})();

const gameLogic = (function () {
  let turn = 1;

  const switchPlayer = () => {
    if (turn === 1) {
      turn = 2;
    } else if (turn === 2) {
      turn = 1;
    } else {
      console.log("Invalid turn value.");
    }
  };

  const getTurn = () => console.log(`It's player ${turn}'s turn`);

  return { switchPlayer, getTurn };
})();

// gameLogic.addToBoard(3, "X");
// gameLogic.addToBoard(3, "O");
// gameLogic.addToBoard(3, "O");

// game.addToBoard(1, "X");
// game.addToBoard(9, "O");

game.createBoard(3, 3);
game.addToBoard(2, 1, "X");
game.addToBoard(3, 1, "O");
game.addToBoard(1, 1, "O");
gameLogic.getTurn();
console.log(`Last value: ${game.getLastValidMove()}`);
game.printBoard();
