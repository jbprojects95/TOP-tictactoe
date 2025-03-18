const createGame = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const printBoard = () => {
    const grid = [
      gameBoard.slice(0, 3),
      gameBoard.slice(3, 6),
      gameBoard.slice(6, 9),
    ];
    console.log(grid);
  };

  const addToBoard = (index, value) => {
    gameBoard.splice(index, 1, value);
  };
  return { gameBoard, printBoard, addToBoard };
})();

createGame.printBoard();

createGame.addToBoard(3, "X");
createGame.addToBoard(7, "O");

createGame.printBoard();
