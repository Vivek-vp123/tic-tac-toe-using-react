import './App.css';
import React , { useState } from 'react'

function Square({value, onSquareClick, isWinningSquare }) {

  return(
  <button className={`square ${isWinningSquare ? 'winning' : ''}`} onClick={onSquareClick }>{value}</button>
 
  );
  
}

function Board() {
  const [xIsNext, setXIsNext]= useState(true);
  const [squares, setSquares]= useState(Array(9).fill(null))
  const [winnerLine, setWinnerLine] = useState([]);

  function handleClick(i){
    if (squares[i] || calculateWinner(squares))
      {
        return;
      }
    const nextSquares = squares.slice();

    if(xIsNext)
      {
        nextSquares[i] = 'X';
      }
      else {
        nextSquares[i]='O';
      }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      setWinnerLine(winner.line);
    }
  }

  function handleRestart(){
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinnerLine([]);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner)
    {
      status = 'Winner:' + winner.player;
    }
    else{
      status = 'Next player:' + (xIsNext ? 'X':'O');
    }

  return (
    
    <div className='game'>
      <h1>Play Tic Tac Toe</h1>
    <div className='statue'>{ status }</div>
    <div className='board-group'>
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={ winnerLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={ winnerLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={ winnerLine.includes(2)} />
    </div>
    <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={ winnerLine.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={ winnerLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={ winnerLine.includes(5)} />
    </div>
    <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={ winnerLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={ winnerLine.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={ winnerLine.includes(8)} />
    </div>
    </div>
    <button className="restart-button" onClick={handleRestart}>
        <i className="fas fa-redo"></i> Restart
      </button>
    </div>
    
  );
}

function calculateWinner(squares)
{
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
  for (let i = 0; i < lines.length; i++)
    {
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
          return { player: squares[a], line: lines[i] };
        }
    }
    return null;
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;