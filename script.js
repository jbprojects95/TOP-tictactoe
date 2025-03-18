function gameLogic() {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const printBoard = () => console.log(gameBoard);

  const addToBoard = (index, value) => {
    const acceptedValues = ["X", "x", "O", "o"];
    if (!acceptedValues.includes(value)) {
      console.log("Wrong input");
      return;
    }
    if (index < 1 || index > 9) {
      console.log("Not in grid!");
      return;
    }

    const boardIndex = index - 1;
    if (gameBoard.at(boardIndex)) {
      console.log("Already at index!");
      return;
    }

    gameBoard.splice(boardIndex, 1, value);
  };
  return { gameBoard, printBoard, addToBoard };
}

// gameLogic.addToBoard(3, "X");
// gameLogic.addToBoard(3, "O");
// gameLogic.addToBoard(3, "O");

const game = gameLogic();

game.printBoard();
game.addToBoard(1, "X");
game.addToBoard(2, "Z");
game.printBoard();
