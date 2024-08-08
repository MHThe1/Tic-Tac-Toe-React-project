import { useState } from "react";


export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }


    let playerName = <span className="player-name">{name}</span>;
    let buttonName = "Edit";

    if (isEditing) {
        playerName = <input type="text" required value={name} />;
        buttonName = "Save";
    }
    return (
        <li>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button isEditing={setIsEditing === false} onClick={handleEditClick}>{buttonName}</button>
        </li>
    )
}