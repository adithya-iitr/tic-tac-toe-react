import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
import GameOver from "./components/GameOver";
const PLAYERS={
  X: 'Player 1',
  O: 'Player 2'
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  let gameBoard = [[null, null, null], [null, null, null], [null, null, null]];;
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSquareSymbol == secondSquareSymbol && firstSquareSymbol && firstSquareSymbol == thirdSquareSymbol)
      winner = firstSquareSymbol;
  }
  const isDraw = (gameTurns.length == 9 && !winner) ? true : false;
  function updateActivePlayer(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X')
        currentPlayer = 'O';
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,];
      return updatedTurns;
    })
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }
  function clickHandler() {
        setGameTurns([])
      }
  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player playerName={PLAYERS.X} playerSymbol={'X'} isActive={gameTurns.length > 0 ? gameTurns[0].player == 'O' : true} handlePlayerNameChange={handlePlayerNameChange}/>
            <Player playerName={PLAYERS.O} playerSymbol={'O'} isActive={gameTurns.length > 0 ? gameTurns[0].player == 'X' : false} handlePlayerNameChange={handlePlayerNameChange}/>
          </ol>
          {(winner || isDraw) && <GameOver winner={players[winner]} onClickRematch={clickHandler} />}
          <GameBoard onSelectSquare={updateActivePlayer} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    )
  }

  export default App
