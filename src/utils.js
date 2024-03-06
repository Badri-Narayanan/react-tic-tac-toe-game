const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function deriveActivePlayer(turns) {
  let activePlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

export function deriveGameBoard(turns) {
  const board = [...INITIAL_GAME_BOARD.map((elements) => [...elements])];

  for (const { square, player } of turns) {
    const { row, col } = square;

    board[row][col] = player;
  }
  return board;
}

export function deriveWinner(board, players) {
  function checkRows() {
    for (const row of board) {
      let isWinner = true;
      for (let colIdx = 0; colIdx < row.length - 1; colIdx++) {
        if (row[colIdx] !== row[colIdx + 1]) {
          isWinner = false;
          break;
        }
      }
      if (isWinner && row[0]) {
        return players[row[0]];
      }
    }
  }

  function checkColumns() {
    for (let colIdx = 0; colIdx < board[0].length; colIdx++) {
      let isWinner = true;
      for (let rowIdx = 0; rowIdx < board.length - 1; rowIdx++) {
        if (board[rowIdx][colIdx] != board[rowIdx + 1][colIdx]) {
          isWinner = false;
          break;
        }
      }
      if (isWinner && board[0][colIdx]) {
        return players[board[0][colIdx]];
      }
    }
  }

  function checkDiagonals() {
    let [rowIdx, colIdx] = [0, 0];
    let isWinner = true;

    while (rowIdx < board.length - 1 && colIdx < board[0].length - 1) {
      if (board[rowIdx][colIdx] !== board[rowIdx + 1][colIdx + 1]) {
        isWinner = false;
        break;
      }
      rowIdx++;
      colIdx++;
    }
    if (isWinner && board[rowIdx][colIdx]) {
      return players[board[rowIdx][colIdx]];
    }

    [isWinner, rowIdx, colIdx] = [true, 0, board[0].length - 1];

    while (rowIdx < board.length - 1 && colIdx > 0) {
      if (board[rowIdx][colIdx] !== board[rowIdx + 1][colIdx - 1]) {
        isWinner = false;
        break;
      }
      rowIdx++;
      colIdx--;
    }

    if (isWinner && board[rowIdx][colIdx]) {
      return players[board[rowIdx][colIdx]];
    }
  }

  return checkRows() || checkColumns() || checkDiagonals();
}
