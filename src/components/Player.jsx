import { useState } from "react"
export default function Player({ playerName, playerSymbol, isActive, handlePlayerNameChange }) {
  const [name, setName] = useState(playerName);
  const [edit, setEdit] = useState(false)
  function editClickHandler() {
    setEdit((edit) => !edit)
    if(edit)
    handlePlayerNameChange(playerSymbol,name);
  }
  function saveClickHandler(event) {
    setName((prevName)=>{
      const newName=event.target.value
      return newName;
    });
  }
  let content
  {
    !edit ? content =
      <li className={isActive ? 'active' : undefined}>
        <span className="player">
          <span className="player-name">{name}</span>
          <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button onClick={editClickHandler}>Edit</button>
      </li> : content =
  <li className={isActive ? 'active' : undefined}>
    <span className="player">
      <input type="text" placeholder="Player Name" required value={name} onChange={saveClickHandler} />
      <span className="player-symbol">{playerSymbol}</span>
    </span>
    <button onClick={editClickHandler}>Save</button>
  </li>
  }
  return content;
}