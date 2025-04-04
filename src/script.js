// TODO: associate gameBoard with the cells made in createBoardCells
// TODO: link the above with the check win function
// TODO: create a function that handles a player turn properly- IE: fires off setTurn etc on click.
// *----------------------[GAME]-------------------------------------------------------
const game = (function () {
  const gameBoard = [];
  let winningConditions = [];
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

  const addToBoard = (row, col, value) => {
    const acceptedValues = ["X", "O"];

    if (!acceptedValues.includes(value)) {
      console.log("Wrong input!");
      return;
    }

    const gameRow = row;
    const gameCol = col;

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
  };

  const generateWinConditions = (size) => {
    winningConditions = [];
    // This is for the rows:
    for (let i = 0; i < size; i++) {
      const rowCondition = [];
      for (let j = 0; j < size; j++) {
        rowCondition.push([i, j]);
      }
      winningConditions.push(rowCondition);
    }
    // This is for the cols:
    for (let j = 0; j < size; j++) {
      const colCondition = [];
      for (let i = 0; i < size; i++) {
        colCondition.push([i, j]);
      }
      winningConditions.push(colCondition);
    }

    // for diagonal 1:
    const diagonal1 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push([i, i]);
    }
    winningConditions.push(diagonal1);

    // For diagonal 2:
    // *No clue what's going on here
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal2.push([i, size - 1 - i]);
    }
    winningConditions.push(diagonal2);

    return winningConditions;
  };

  const getBoardSize = () => {
    const boardContainer = document.querySelector(".grid_container");
    const cellCount = boardContainer.childElementCount;
    const boardSize = Math.sqrt(cellCount);
    return boardSize;
  };

  const checkWin = () => {
    for (let condition of winningConditions) {
      const [firstRow, firstCol] = condition[0];
      let gameMarker = gameBoard[firstRow][firstCol];

      if (gameMarker === null) {
        continue;
      }

      let win = true;

      for (let i = 1; i < condition.length; i++) {
        const [row, col] = condition[i];
        if (gameBoard[row][col] !== gameMarker) {
          win = false;
          break;
        }
      }

      if (win) {
        return true;
      }
    }

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
    generateWinConditions,
    checkWin,
    getBoardSize,
  };
})();

// *----------------------[DOM]-------------------------------------------------------

const domController = (function () {
  const createBoardCells = (amount) => {
    const boardContainer = document.querySelector(".grid_container");
    // Had to call this here so that the grid itself dynamically changes depending on amount
    boardContainer.style.gridTemplateColumns = `repeat(${amount}, 1fr)`; //amount + 1 for rectangle
    const parent = boardContainer.parentElement;
    boardContainer.innerHTML = "";
    game.createBoard(amount, amount);
    game.printBoard();

    for (let div = 1; div <= amount * amount; div++) {
      //amount * (amount + 1) for rectangle
      let cells = document.createElement("div");
      const divSize = parent.width / amount;
      cells.classList.add("cells");

      const row = Math.floor((div - 1) / amount);
      const col = (div - 1) % amount;
      cells.setAttribute("data-row", row);
      cells.setAttribute("data-col", col);
      cells.style.width = divSize + "px";
      cells.style.height = divSize + "px";

      boardContainer.appendChild(cells);

      cells.addEventListener("click", () => {
        if (cells.textContent !== "") return;

        console.log("cell clicked!");
        console.log(
          cells.getAttribute("data-row"),
          cells.getAttribute("data-col")
        );

        const currentTurn = player.getTurn();
        let marker;
        if (currentTurn === 1) {
          marker = "X";
        } else if (currentTurn === 2) {
          marker = "O";
        }

        let cellValue = document.createElement("p");
        cellValue.textContent = marker;
        cells.appendChild(cellValue);

        const row = Number(cells.getAttribute("data-row"));
        const col = Number(cells.getAttribute("data-col"));
        game.addToBoard(row, col, marker);

        if (game.checkWin()) {
          console.log("Winner!");
        }
        game.printBoard();
      });
    }
  };

  return { createBoardCells };
})();

// *----------------------[PLAYER]-------------------------------------------------------

const player = (function () {
  let turn = 1;

  const getTurn = () => turn;

  const setTurn = (value) => {
    let marker = value.toUpperCase();

    if (turn === 1 && marker === "X") {
      turn = 2;
    } else if (turn === 2 && marker === "O") {
      turn = 1;
    } else {
      console.log("Not your turn!");
    }
  };

  const printPlayerTurn = () => {
    if (!game.checkWin()) {
      console.log(`PLAYER TURN: ${player.getTurn()}`);
    } else {
      console.log(`Winner is: ${game.getLastValidMove()}`);
    }
  };

  return { getTurn, setTurn, printPlayerTurn };
})();

domController.createBoardCells(3);
const boardSize = game.getBoardSize();
game.generateWinConditions(boardSize);
