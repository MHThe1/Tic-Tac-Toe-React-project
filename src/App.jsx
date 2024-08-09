import { useState } from "react";

import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"

const sounds = {
  move: new Audio('/sounds/move-sound.mp3'),
  win: new Audio('/sounds/win-sound.mp3'),
  drawn: new Audio('/sounds/drawn-sound.mp3'),
};


function playSound(type) {
  if (sounds[type]) {
    sounds[type].play();
  }
};

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
}

const INITIAL_GAME_BOARD = [
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

function derivedWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS ) {
    const firstCellSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondCellSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdCellSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstCellSymbol && firstCellSymbol === secondCellSymbol && firstCellSymbol === thirdCellSymbol){
      winner = players[firstCellSymbol];
      playSound('win');
    }
  }
  
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

  return gameBoard;
}



function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, players);

  const matchDrawn = gameTurns.length === 9 && !winner;
  if (matchDrawn){
    playSound('drawn');
  }
  
  function handlePlayerActivity(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,];
      
      playSound('move');

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
    <Header />
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
          initialName={PLAYERS.X} 
          symbol="X" isActive={activePlayer === 'X'} 
          onNameChange={handlePlayerNameChange} />
        <Player 
          initialName={PLAYERS.O}
          symbol="O" isActive={activePlayer === 'O'}
          onNameChange={handlePlayerNameChange} />
      </ol>
      {winner && <GameOver winner={winner} onRestart={handleRestart} />}
      {matchDrawn && <GameOver onRestart={handleRestart} />}
      <GameBoard 
        onSelectPlayer={handlePlayerActivity} 
        board={gameBoard} />
    </div>
    <Log playerNames={players} turns={gameTurns} />
    <Footer />
  </main>;
}

export default App