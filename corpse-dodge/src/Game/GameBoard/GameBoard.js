import "../../styles/Game/GameBoard/GameBoard.css";
import { useState, useEffect } from "react";
import Player from "./Player";
import Projectile from "./Projectile";
import {
  checkPlayerCollision,
  projectileSpawnHandler,
  updatePlayerPosition,
  updateProjectilePositions,
} from "./GameLogic";

const GameBoard = (props) => {
  const { addScore, setGameOver } = props;
  const boardSize = {
    x: 384,
    y: 492,
  };
  const [playerPosition, setPlayerPosition] = useState({
    x: boardSize.x / 2,
    y: boardSize.y / 2,
  });
  const [playerDirection, setPlayerDirection] = useState("down");
  const [isPlayerMoving, setIsPlayerMoving] = useState(false);
  const [projectiles, setProjectiles] = useState([]);
  const [difficultyModifier, setDifficultyModifier] = useState(1);
  const [keyState, setKeyState] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const intervalId = setInterval(() => {
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
    }, msPerFrame);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(intervalId);
    };
  }, [keyState, projectiles]);

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