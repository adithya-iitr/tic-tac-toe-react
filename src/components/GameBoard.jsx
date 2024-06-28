export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((rows, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {rows.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol === null ? false : true}>
                                    {playerSymbol}
                                </button>
                            </li>)
                        )}
                    </ol>
                </li>))}
        </ol>
    )
}