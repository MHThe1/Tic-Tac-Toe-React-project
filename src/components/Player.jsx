import { useState } from "react";


export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let buttonName = "Edit";

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        buttonName = "Save";
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button isEditing={setIsEditing === false} onClick={handleEditClick}>{buttonName}</button>
        </li>
    )
}