const game = (function () {
  // const gameBoard = [null, null, null, null, null, null, null, null, null];
  const gameBoard = [];
  let lastValidMove;
  const winningConditions = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

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

  // ?1D array alternative to the flat 2D array above
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
    // TODO: add logic that doesn't let player play "O" or "X multiple times in a row. IE: console.log("That's not allowed") or something to that effect
    const acceptedValues = ["X", "O"];

    if (row < 1 || row > 3 || col < 1 || col > 3) {
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

    const marker = value.toUpperCase();

    if (player.getTurn() === 1 && marker !== "X") {
      console.log("It's not your turn");
      return;
    } else if (player.getTurn() === 2 && marker !== "O") {
      console.log("It's not your turn");
      return;
    }
    gameBoard[gameRow][gameCol] = marker;
    lastValidMove = marker;
    player.setTurn(game.getLastValidMove());

    // !Ignore:
    // make lastValidMove an object incase i need the x and y value
    // lastValidMove = { row: gameRow, col: gameCol, value: value };
  };

  const checkWin = () => {
    // I still don't full understand nested for loops, so I'm adding detailed explanations for future me to reference.

    // This loops through each win con in winningConditions array. Each condition in that array is a set of 3 coordinate pairs.
    for (let condition of winningConditions) {
      // -------------------------------------------
      // For the current winning condition (IE: winningCondition[0]) it takes the first coordinate pair
      // and double checks it's either x o or null.
      // If it's null we skip the first cell as it's empty and continue
      const [firstRow, firstCol] = condition[0];
      let marker = gameBoard[firstRow][firstCol];

      if (marker === null) {
        continue;
      }
      // -----------------------------------------------
      // Here a flag is set up assuming a win. If win con isn't met then this is set to false later.
      // The loop starts at 1 because we already did cell[0] to get the marker (remember that if it's null we continue)
      // For each cell remaining in the winning condition it checks if the gameBoard value matches at the marker from the first cell.
      // If any cell doesnt match win is then set to false and we break out the loop.

      // So the for(condition in winningConditions) is checking each array in winCon array.
      // EG: arrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], it would loop through those as arrays[0] = [1, 2, 3]
      // Then the loop below checks the cells within each condition the outer loop goes through.
      let win = true;

      for (let i = 1; i < condition.length; i++) {
        const [row, col] = condition[i];
        if (gameBoard[row][col] !== marker) {
          win = false;
          break;
        }
        // -----------------------------------------------
      }
      // -----------------------------------------------
      // Here the code returns the winning marker (I'll change this logic eventually)
      // It will only do this after checking each individual winCon cells. If the markers all match it declares the winner.
      if (win) {
        console.log(`Winner is: ${marker}`);
        return true;
      }
    }
    // Return faslse here if no winner is found
    return false;
  };

  // const getLastValidMove = () => lastValidMove.value;
  const getLastValidMove = () => lastValidMove;

  return {
    createBoard,
    getBoard,
    printBoard,
    addToBoard,
    getLastValidMove,
    checkWin,
  };
})();

const player = (function () {
  let turn = 1;

  const getTurn = () => turn;

  const setTurn = (value) => {
    if (game.checkWin()) {
      // console.log("Winner found, no further moves allowed.");
      return;
    }
    let marker = value.toUpperCase();

    if (turn === 1 && marker === "X") {
      turn = 2;
    } else if (turn === 2 && marker === "O") {
      turn = 1;
    } else {
      console.log("Not your turn!");
    }
  };

  return { getTurn, setTurn };
})();

game.createBoard(3, 3);

game.addToBoard(3, 2, "X");
// player.setTurn(game.getLastValidMove());

game.addToBoard(2, 2, "O");
// player.setTurn(game.getLastValidMove());

game.addToBoard(3, 1, "X");

game.addToBoard(1, 2, "O");

game.addToBoard(3, 3, "X");

// ----------------------------------------------------
console.log(`PLAYER TURN: ${player.getTurn()}`);
console.log("-----------------------------");
game.printBoard();
