export default function Log({ playerNames, turns }) {
    const log = turns.map((turn, index) => {
        const { square, player } = turn;
        const { row, col } = square;
        let currPlayerName = playerNames.X;
        if (player === 'X' ? currPlayerName = playerNames.X : currPlayerName = playerNames.O)

        return (
            <li key={index}>
                {currPlayerName} selected row {row}, column {col}
            </li>
        );
    });

    return (
        <ol id="log">
            {log}
        </ol>
    );
}
