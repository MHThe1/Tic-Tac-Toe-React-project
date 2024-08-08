export default function GameOver({ winner, onRestart }) {
    return <div id="game-over">
        {winner ? (<><h2>Game Over!</h2>
        <p>{winner} won!</p></>) : (<h2>Match Drawn!</h2>)}

        <p>
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
}