export default function Log({ turns }) {
    const log = turns.map((turn, index) => {
        const { square, player } = turn;
        const { row, col } = square;

        return (
            <li key={index}>
                Player {player} selected row {row}, column {col}
            </li>
        );
    });

    return (
        <ol id="log">
            {log}
        </ol>
    );
}
