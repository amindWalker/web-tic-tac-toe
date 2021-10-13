import './App.css';
import GameBoard from './components/GameBoard';
import GameBoardSquare from './components/GameBoardSquare';
import { useState, useEffect } from 'react';
import Button from './components/Button';
import GameMessage from './components/GameMessage';
import axios from 'axios';

const totalSquares = () => new Array(9).fill(null);

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function App() {
  const [boardSquares, setBoardSquares] = useState(totalSquares());
  const [highlightWinner, setHighlightWinner] = useState('');
  const [gameMessage, setGameMessage] = useState('');
  const [scores, setScores] = useState({
    player: 0,
    computer: 0
  });

  /**
   * @description - GET scores on page load
   */
  useEffect(() => {
    axios.get('http://localhost:3001/scores').then((res) => {
      console.log('PLAYER:', res.data.slice(-1)[0].player);
      setScores({
        player: res.data.slice(-1)[0].player,
        computer: res.data.slice(-1)[0].computer
      });
    });
  }, []);

  /**
   * @description - POST scores only if scores have changed
   */
  useEffect(() => {
    if (boardSquares.filter((square) => square !== null).length % 2 === 0) {
      axios.post('http://localhost:3001/scores', scores);
    }
  }, [scores, boardSquares]);

  useEffect(() => {
    const isAITurn =
      boardSquares.filter((square) => square !== null).length % 2 === 1;
    const matchLines = (a, b, c) => {
      return winLines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => boardSquares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };
    const avaiableSquares = boardSquares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);

    /**
     * @description - Winning variables
     */
    const playerWon = matchLines('X', 'X', 'X').length > 0;
    const computerWon = matchLines('O', 'O', 'O').length > 0;
    const tie = boardSquares.filter((square) => square === null).length === 0;

    /**
     * @description - AI logic
     */

    const moveAITo = (index) => {
      const fillSquares = boardSquares;
      fillSquares[index] = 'O';
      setBoardSquares([...fillSquares]);
    };

    if (isAITurn) {
      const winningLines = matchLines('O', 'O', null);
      if (winningLines.length > 0) {
        const winIndex = winningLines[0].filter(
          (index) => boardSquares[index] === null
        )[0];
        moveAITo(winIndex);
        return;
      }

      const lineBlock = matchLines('X', 'X', null);
      if (lineBlock.length > 0) {
        const blockIndex = lineBlock[0].filter(
          (index) => boardSquares[index] === null
        )[0];
        moveAITo(blockIndex);
        return;
      }

      const lineFill = matchLines('O', null, null);
      if (lineFill.length > 0) {
        moveAITo(
          lineFill[0].filter((index) => boardSquares[index] === null)[0]
        );
        return;
      }

      const randomMove =
        avaiableSquares[Math.ceil(Math.random() * avaiableSquares.length)];
      moveAITo(randomMove);
    }

    /**
     * @description - Win conditions
     */

    if (playerWon) {
      setHighlightWinner('player');
      setGameMessage('😼 Won!');
      setScores((prevScores) => ({
        ...prevScores,
        player: prevScores.player + 1
      }));
    }
    if (computerWon) {
      setHighlightWinner('computer');
      setGameMessage('🤖 Lost!');
      setScores((prevScores) => ({
        ...prevScores,
        computer: prevScores.computer + 1
      }));
    }
    if (tie) {
      setHighlightWinner('tie');
      setGameMessage('🤷‍♂️ Tie!');
    }
  }, [boardSquares]);

  /**
   * @description - Game rules
   *
   * @param index - Must be a empty square to be able to play
   *
   * @returns - Player move
   */
  const handleClick = (index) => {
    const isPlayerTurn =
      boardSquares.filter((square) => square !== null).length % 2 === 0;

    if (isPlayerTurn) {
      const fillSquares = boardSquares;
      const isSquareEmpty = fillSquares[index] === null;
      if (isSquareEmpty) {
        fillSquares[index] = 'X';
        setBoardSquares([...fillSquares]);
      }
    }
  };

  const handleNewGame = () => {
    setBoardSquares(totalSquares());
    setHighlightWinner('');
    setGameMessage('');
  };

  return (
    <main>
      <h1 className="text-center"> Hooked Tic-Tac-Toe</h1>
      <GameBoard>
        {boardSquares.map((square, index) => (
          <GameBoardSquare
            key={index}
            player={square === 'X' ? 1 : 0}
            computer={square === 'O' ? 1 : 0}
            onClick={() => handleClick(index)}
            style={
              highlightWinner === 'player'
                ? { border: '2px solid green' }
                : highlightWinner === 'computer'
                ? { border: '2px solid red' }
                : highlightWinner === 'tie'
                ? { border: '2px solid lightgray', color: 'lightgray' }
                : {}
            }
          />
        ))}
      </GameBoard>
      <Button onClick={handleNewGame} text="New Game" />
      <GameMessage message={gameMessage} />
      <table className="scores table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Player</th>
            <th scope="col">Computer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="bg-info" scope="row">
              🏆
            </th>
            <td className="bg-info">{scores.player}</td>
            <td className="bg-info">{scores.computer}</td>
          </tr>
        </tbody>
      </table>
      <div className="game-records">
        <a target="_blank" rel="noreferrer" href="http://localhost:3001/scores">
          <button className="btn btn-info">Last Games</button>
        </a>
      </div>
    </main>
  );
}

export default App;
