export default function Log({ turns }) {
  const getBoxRepr = (box) => `${box.row},${box.col}`;
  return (
    <ol id="log">
      {turns.map(({ square, player }, index) => (
        <li key={getBoxRepr(square)} className={index === 0 ? "highlighted" : undefined}>
          {player} chose {getBoxRepr(square)}
        </li>
      ))}
    </ol>
  );
}
