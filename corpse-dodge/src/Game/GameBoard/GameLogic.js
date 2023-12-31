const boardSize = {
  x: 384,
  y: 492,
};

const boundaries = {
  left: 45,
  top: 50,
  right: boardSize.x - 20,
  bottom: boardSize.y - 20,
};
const playerSpeed = 4;
const playerDimensions = {
  width: 24,
  height: 45,
};
const projectileDimensions = { width: 48, height: 15 };

export const updatePlayerPosition = (
  keyState,
  setPlayerPosition,
  setPlayerDirection,
  setIsPlayerMoving
) => {
  let deltaX = 0;
  let deltaY = 0;

  if (keyState.ArrowUp) {
    deltaY = -playerSpeed;
    setPlayerDirection("up");
  } else if (keyState.ArrowDown) {
    deltaY = playerSpeed;
    setPlayerDirection("down");
  } else if (keyState.ArrowLeft) {
    deltaX = -playerSpeed;
    setPlayerDirection("left");
  } else if (keyState.ArrowRight) {
    deltaX = playerSpeed;
    setPlayerDirection("right");
  }

  if (deltaX == 0 && deltaY == 0) {
    setIsPlayerMoving(false);
    return;
  }

  setPlayerPosition((prevPos) => {
    const newPosX = prevPos.x + deltaX;
    const newPosY = prevPos.y + deltaY;

    if (
      (deltaX > 0 && newPosX + playerDimensions.width > boundaries.right) ||
      (deltaX < 0 && newPosX < boundaries.left) ||
      (deltaY > 0 && newPosY + playerDimensions.height > boundaries.bottom) ||
      (deltaY < 0 && newPosY < boundaries.top)
    ) {
      setIsPlayerMoving(false);
      // If the new position exceeds the boundaries, return the previous state
      return prevPos;
    }

    setIsPlayerMoving(true);
    // Update the position
    return {
      x: newPosX,
      y: newPosY,
    };
  });
};

export const updateProjectilePositions = (setProjectiles, addScore) => {
  setProjectiles((prevState) => {
    const updatedProjectiles = [];
    for (let proj of prevState) {
      switch (proj.direction) {
        case "up":
          if (proj.position.y - proj.speed > -projectileDimensions.width) {
            updatedProjectiles.push({
              direction: proj.direction,
              speed: proj.speed,
              position: {
                x: proj.position.x,
                y: proj.position.y - proj.speed,
              },
            });
          } else {
            addScore();
          }
          break;
        case "down":
          if (proj.position.y + proj.speed < boundaries.bottom) {
            updatedProjectiles.push({
              direction: proj.direction,
              speed: proj.speed,
              position: {
                x: proj.position.x,
                y: proj.position.y + proj.speed,
              },
            });
          } else {
            addScore();
          }
          break;
        case "right":
          if (proj.position.x + proj.speed < boundaries.right) {
            updatedProjectiles.push({
              direction: proj.direction,
              speed: proj.speed,
              position: {
                x: proj.position.x + proj.speed,
                y: proj.position.y,
              },
            });
          } else {
            addScore();
          }
          break;
        case "left":
          if (proj.position.x - proj.speed > -projectileDimensions.width) {
            updatedProjectiles.push({
              direction: proj.direction,
              speed: proj.speed,
              position: {
                x: proj.position.x - proj.speed,
                y: proj.position.y,
              },
            });
          } else {
            addScore();
          }
          break;
      }
    }
    return updatedProjectiles;
  });
};

export const projectileSpawnHandler = (
  difficultyModifier,
  setDifficultyModifier,
  setProjectileCountdown,
  setProjectiles
) => {
  setProjectileCountdown((prevState) => {
    if (prevState <= 0) {
      spawnProjectile(setProjectiles);
      return 40 / difficultyModifier;
    } else {
      return --prevState;
    }
  });
  setDifficultyModifier((prevState) => prevState + 0.0005);
};

const spawnProjectile = (setProjectiles) => {
  const direction = ["up", "down", "right", "left"][
    Math.floor(Math.random() * 4)
  ];
  setProjectiles((prevState) => {
    let position = { x: 0, y: 0 };
    switch (direction) {
      case "up":
        position = {
          x: (boundaries.right - projectileDimensions.width) * Math.random(),
          y: boardSize.y - projectileDimensions.height,
        };
        if (position.x < boundaries.left) position.x = boundaries.left;
        break;
      case "down":
        position = {
          x: (boundaries.right - projectileDimensions.width) * Math.random(),
          y: 0,
        };
        if (position.x < boundaries.left) position.x = boundaries.left;
        break;
      case "right":
        position = {
          x: 0,
          y:
            boundaries.top +
            (boundaries.bottom - projectileDimensions.height - boundaries.top) *
              Math.random(),
        };
        break;
      case "left":
        position = {
          x: boardSize.x - projectileDimensions.width,
          y:
            boundaries.top +
            (boundaries.bottom - projectileDimensions.height - boundaries.top) *
              Math.random(),
        };
        break;
    }
    let newProj = {
      direction: direction,
      speed: 3,
      position: position,
    };
    const updatedState = [...prevState, newProj];
    return updatedState;
  });
};

export const checkPlayerCollision = (
  projectiles,
  playerPosition,
  setGameOver
) => {
  for (let proj of projectiles) {
    let projRight = proj.position.x + projectileDimensions.width;
    let projBottom = proj.position.y + projectileDimensions.height;
    if (proj.direction == "up" || proj.direction == "down") {
      projRight = proj.position.x + projectileDimensions.height;
      projBottom = proj.position.y + projectileDimensions.width;
    }
    if (
      ((playerPosition.x + playerDimensions.width > proj.position.x &&
        proj.position.x > playerPosition.x) ||
        (playerPosition.x + playerDimensions.width > projRight &&
          projRight > playerPosition.x)) &&
      ((playerPosition.y + playerDimensions.height > proj.position.y &&
        proj.position.y > playerPosition.y) ||
        (playerPosition.y + playerDimensions.height > projBottom &&
          projBottom > playerPosition.y))
    ) {
      setGameOver(true);
    }
  }
};
