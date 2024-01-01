import GameBoard from "./GameBoard/GameBoard";
import "../styles/Game/Game.css";
import { useState } from "react";
import RecordScore from "./GameOver/RecordScore";
import PlayOrMenu from "./GameOver/PlayOrMenu";

const Game = (props) => {
  const { goToMenu } = props;
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isNameSubmitted, setNameSubmitted] = useState(false);

  const playAgain = () => {
    setGameOver(false);
    setNameSubmitted(false);
    setScore(0);
  };

  return (
    <div className="gameContainer">
      {!gameOver && (
        <>
          <div className="scoreContainer">
            <p>Score: {score}</p>
          </div>
          <GameBoard
            addScore={() => setScore((prevScore) => prevScore + 100)}
            setGameOver={setGameOver}
          />
        </>
      )}
      {gameOver && (
        <div className="gameOverContainer">
          <p>Game Over!</p>
          {!isNameSubmitted && (
            <RecordScore setNameSubmitted={setNameSubmitted} score={score} />
          )}
          {isNameSubmitted && (
            <PlayOrMenu goToMenu={goToMenu} playAgain={playAgain} />
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
