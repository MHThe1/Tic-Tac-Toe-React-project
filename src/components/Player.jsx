import { useState, useRef, useEffect } from "react";


export default function Player({ initialName, symbol, isActive, onNameChange }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef(null);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onNameChange(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleEditClick();
        }
    }

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    let editablePlayerName = <span onDoubleClick={handleEditClick} className="player-name">{playerName}</span>;
    let buttonName = "Edit";

    if (isEditing) {
        editablePlayerName = <input type="text" required
                                    value={playerName} 
                                    onChange={handleChange} 
                                    ref={inputRef} 
                                    onKeyDown={handleKeyDown}
                                     />;
        buttonName = "Save";
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player-symbol">{symbol}</span>
            <span className="player">
                {editablePlayerName}
            </span>
            <button onClick={handleEditClick}>{buttonName}</button>
        </li>
    )
}