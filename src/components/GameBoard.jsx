export default function GameBoard({ board, onSelect }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIdx) => (
        <ol>
          {row.map((symbol, colIdx) => (
            <li>
              <button
                onClick={() => onSelect(rowIdx, colIdx)}
                disabled={symbol !== null}
              >
                {symbol}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
}
