import './App.css';
import { useState, useEffect, useRef } from 'react';

function Cell({value, onClick}) {
  //const [board, setBoard] = useState(initialBoard);
  return (<button className="cell" onClick={onClick}>{value}</button>);
}

function App() {
  const gameRef = useRef(null);
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const winner_player = checkWin();
    if ((winner_player === 'X') || (winner_player === 'O')) {
      setWinner(winner_player);
      setGameOver(true);
    }
  }, [board, checkWin]);

  useEffect(() => {
    if (gameOver) {
      
    }
  }, [gameOver, winner]);


  function handleClick(index, player) {
    if (board[index] !== '' || gameOver) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = player;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  function checkWin() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log("ganhou");
        return board[a];
      }
    }
    return null;
  }

  function Footer() {
    if (gameOver) {
      return (
        <div className="footer">
          <h1>Game Over</h1>
          <h2>Winner: {winner}</h2>
        </div>
      );
    }
    else {
      return (
        <div className="footer">
          <p>Current Player: {currentPlayer}</p>
        </div>
      );
    }
  }

  return (
    <>
          <header className="App-header">
            <div className="header-content">
            <h1>Tic Tac Toe</h1>
            </div>

            <button className="header-button" onClick={() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              });
            }}>Start Game</button>
          </header>
    <div className="App" ref={gameRef}>
      <div className="game-container">
        <div className="row">
          <Cell value={board[0]} onClick={() => handleClick(0, currentPlayer)} />
          <Cell value={board[1]} onClick={() => handleClick(1, currentPlayer)} />
          <Cell value={board[2]} onClick={() => handleClick(2, currentPlayer)} />
        </div>
        <div className="row">
          <Cell value={board[3]} onClick={() => handleClick(3, currentPlayer)} />
          <Cell value={board[4]} onClick={() => handleClick(4, currentPlayer)} />
          <Cell value={board[5]} onClick={() => handleClick(5, currentPlayer)} />
        </div>
        <div className="row">
          <Cell value={board[6]} onClick={() => handleClick(6, currentPlayer)} />
          <Cell value={board[7]} onClick={() => handleClick(7, currentPlayer)} />
          <Cell value={board[8]} onClick={() => handleClick(8, currentPlayer)} />
        </div>
      </div>

      <Footer/>

      <button className="reset-button" onClick={() => {
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
        setWinner(null);
        setGameOver(false);
      }}>Reset Game</button>
    </div>
    </>
  );
}

export default App;

