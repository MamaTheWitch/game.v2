import React, { useState } from 'react';
import Board from './Board';
import '../App.css';

const Game = () => {

  function calculateWinner(squares) {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const [history, setHistory] = useState([Array(9).fill(null)]); //tracking an array of 9 squares
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true); //start always from x
  let winner = calculateWinner(history[stepNumber]);
  const player = xIsNext ? "☕" : "🍺"; // if true, else

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1); // from beginning to now
    const current = historyPoint[stepNumber];
    const squares = [...current]; // using spread operator to create a copy of full history
    if (winner || squares[i]) return; // return only if won or occupied
    squares[i] = player; // else, selecting a square
    setHistory([...historyPoint, squares]); // spread the history point, so all the history we had before, plus the square that was just clicked
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext); // next is the opposite of current
  };

  const refresh = () => window.location.reload(false) //refreshing the page

  const timeTravel = history.map((hop, move) => {

    const travel = () => jumpTo(move)

    const jumpTo = (step) => {
      setStepNumber(step);
      setXisNext(step % 2 === 0);
    };

    const destination = move ? `${move}` : "0";
    return (
      <ul key={move}>
        <button id="stepBubble" onClick={travel}>{destination}</button>
      </ul>
    );
  });


  return (
    <div id="container">
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div id="info">
        <p> {winner ? "Winner: " + winner : "Next Player: " + player} </p>
        <button id="refresh" onClick={refresh}> 🔄 Restart the game </button>
        <div>
          <p>↩️ Time travel:</p>
          <div id="timeline">{timeTravel}</div>
        </div>
      </div>
    </div>
  )

};

export default Game;