import { useState } from "react";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard";
import { deriveActivePlayer, deriveGameBoard, deriveWinner } from "./utils";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const board = deriveGameBoard(gameTurns);
  const winner = deriveWinner(board, playerNames);
  const isDraw = gameTurns.length === 9 && !winner;

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((players) => ({
      ...players,
      [symbol]: newName,
    }));
  }

  function handlePlayerMoves(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(prevTurns);

      return [
        {
          square: { row: rowIndex, col: colIndex },
          player: currPlayer,
        },
        ...prevTurns,
      ];
    });
  }

  function resetGame() {
    setGameTurns([]);
  }

  return (
    <>
      <main id="game-container">
        <ul id="players" className="highlight-player">
          <Player
            name={playerNames.X}
            symbol="X"
            handleNameChange={handlePlayerNameChange}
            isActive={activePlayer === "X"}
          />
          <Player
            name={playerNames.O}
            symbol="O"
            handleNameChange={handlePlayerNameChange}
            isActive={activePlayer === "O"}
          />
        </ul>
        {(winner || isDraw) && <GameOver winner={winner} onReset={resetGame} />}
        <GameBoard board={board} onSelect={handlePlayerMoves} />
      </main>
      <Log turns={gameTurns} />
    </>
  );
}

export default App;
