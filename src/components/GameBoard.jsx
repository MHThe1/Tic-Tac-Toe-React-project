import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectPlayer, activePlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectCell(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });

        onSelectPlayer();
    }
    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button onClick={() => handleSelectCell(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)}
            </ol>
        </li>)}
    </ol>
}