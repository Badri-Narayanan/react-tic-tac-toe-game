export default function GameOver({ winner, onReset }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{winner ? `${winner} has Won!!` : "It's a draw!!"}</p>
      <button onClick={onReset}>Restart</button>
    </div>
  );
}
