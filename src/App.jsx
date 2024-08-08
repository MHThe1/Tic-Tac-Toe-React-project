import { useState } from "react";

import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS ) {
    const firstCellSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondCellSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdCellSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstCellSymbol && firstCellSymbol === secondCellSymbol && firstCellSymbol === thirdCellSymbol){
      winner = players[firstCellSymbol];
    }
  }

  const matchDrawn = gameTurns.length === 9 && !winner;
  
  function handlePlayerActivity(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,];

      return updatedTurns;

    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    }
    );
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
          initialName="Player 1" 
          symbol="X" isActive={activePlayer === 'X'} 
          onNameChange={handlePlayerNameChange} />
        <Player 
          initialName="Player 2" 
          symbol="O" isActive={activePlayer === 'O'}
          onNameChange={handlePlayerNameChange} />
      </ol>
      {winner && <GameOver winner={winner} onRestart={handleRestart} />}
      {matchDrawn && <GameOver onRestart={handleRestart} />}
      <GameBoard 
        onSelectPlayer={handlePlayerActivity} 
        board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>;
}

export default App
