import "../../styles/Game/GameBoard/GameBoard.css";
import { useState, useEffect } from "react";
import Player from "./Player";
import Projectile from "./Projectile";
import {
  checkPlayerCollision,
  projectileSpawnHandler,
  updatePlayerPosition,
  updateProjectilePositions,
  BOARD_SIZE
} from "./GameLogic";

const GameBoard = (props) => {
  const { addScore, setGameOver } = props;
  const [playerPosition, setPlayerPosition] = useState({
    x: BOARD_SIZE.x / 2,
    y: BOARD_SIZE.y / 2,
  });
  const [playerDirection, setPlayerDirection] = useState("down");
  const [isPlayerMoving, setIsPlayerMoving] = useState(false);
  const [projectiles, setProjectiles] = useState([]);
  const [difficultyModifier, setDifficultyModifier] = useState(1);
  const [keyState, setKeyState] = useState([{
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  }]);
  const [projectileCountdown, setProjectileCountdown] = useState(40);
  const msPerFrame = 1000 / 60;

  const handleKeyDown = (event) => {
    setKeyState((prevKeyState) => ({
      ...prevKeyState,
      [event.key]: true,
    }));
  };

  const handleKeyUp = (event) => {
    setKeyState((prevKeyState) => ({
      ...prevKeyState,
      [event.key]: false,
    }));
  };

  const updateGame = () => {
    updatePlayerPosition(
      keyState,
      setPlayerPosition,
      setPlayerDirection,
      setIsPlayerMoving
    );
    updateProjectilePositions(setProjectiles, addScore);
    checkPlayerCollision(projectiles, playerPosition, setGameOver);
    projectileSpawnHandler(
      difficultyModifier,
      setDifficultyModifier,
      setProjectileCountdown,
      setProjectiles
    );
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const intervalId = setInterval(updateGame, msPerFrame);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(intervalId);
    };
  });

  return (
    <div className="boardContainer">
      <Player
        position={playerPosition}
        playerDirection={playerDirection}
        isMoving={isPlayerMoving}
      />
      {projectiles.map((proj) => (
        <Projectile position={proj.position} direction={proj.direction} />
      ))}
    </div>
  );
};

export default GameBoard;