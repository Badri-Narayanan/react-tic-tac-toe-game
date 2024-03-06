import { useState } from "react";

export default function Player({ name, symbol, handleNameChange, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleSaveEvent(){
    setIsEditing(editing => !editing)

    if(isEditing)
    {
        handleNameChange(symbol, playerName);
    }
  }

  let playerInfo = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerInfo = <input type="text" required value={playerName} onChange={event => setPlayerName(event.target.value)}/>;
  }
  const playerClasses = `player ${isActive ? "active" : ""}`;

  return (
    <li className={playerClasses}>
      {playerInfo}
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleSaveEvent}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
