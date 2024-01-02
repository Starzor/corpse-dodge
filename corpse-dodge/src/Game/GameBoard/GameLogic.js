export const BOARD_SIZE = {
  x: 384,
  y: 492,
};

const BOUNDARIES = {
  left: 45,
  top: 50,
  right: BOARD_SIZE.x - 20,
  bottom: BOARD_SIZE.y - 20,
};
const PLAYER_SPEED = 4;
const PLAYER_DIMENSIONS = {
  width: 24,
  height: 45,
};
const PROJECTILE_DIMENSIONS = { width: 48, height: 15 };

export const updatePlayerPosition = (
  keyState,
  setPlayerPosition,
  setPlayerDirection,
  setIsPlayerMoving
) => {
  let deltaX = 0;
  let deltaY = 0;

  if (keyState.ArrowUp) {
    deltaY = -PLAYER_SPEED;
    setPlayerDirection("up");
  } else if (keyState.ArrowRight) {
    deltaX = PLAYER_SPEED;
    setPlayerDirection("right");
  } else if (keyState.ArrowDown) {
    deltaY = PLAYER_SPEED;
    setPlayerDirection("down");
  } else if (keyState.ArrowLeft) {
    deltaX = -PLAYER_SPEED;
    setPlayerDirection("left");
  }

  if (deltaX == 0 && deltaY == 0) {
    setIsPlayerMoving(false);
    return;
  }

  setPlayerPosition((prevPos) => {
    const newPosX = prevPos.x + deltaX;
    const newPosY = prevPos.y + deltaY;

    if (
      (deltaX > 0 && newPosX + PLAYER_DIMENSIONS.width > BOUNDARIES.right) ||
      (deltaX < 0 && newPosX < BOUNDARIES.left) ||
      (deltaY > 0 && newPosY + PLAYER_DIMENSIONS.height > BOUNDARIES.bottom) ||
      (deltaY < 0 && newPosY < BOUNDARIES.top)
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
          if (proj.position.y - proj.speed > -PROJECTILE_DIMENSIONS.width) {
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
          if (proj.position.y + proj.speed < BOUNDARIES.bottom) {
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
          if (proj.position.x + proj.speed < BOUNDARIES.right) {
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
          if (proj.position.x - proj.speed > -PROJECTILE_DIMENSIONS.width) {
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
          x: (BOUNDARIES.right - PROJECTILE_DIMENSIONS.width) * Math.random(),
          y: BOARD_SIZE.y - PROJECTILE_DIMENSIONS.height,
        };
        if (position.x < BOUNDARIES.left) position.x = BOUNDARIES.left;
        break;
      case "down":
        position = {
          x: (BOUNDARIES.right - PROJECTILE_DIMENSIONS.width) * Math.random(),
          y: 0,
        };
        if (position.x < BOUNDARIES.left) position.x = BOUNDARIES.left;
        break;
      case "right":
        position = {
          x: 0,
          y:
            BOUNDARIES.top +
            (BOUNDARIES.bottom -
              PROJECTILE_DIMENSIONS.height -
              BOUNDARIES.top) *
              Math.random(),
        };
        break;
      case "left":
        position = {
          x: BOARD_SIZE.x - PROJECTILE_DIMENSIONS.width,
          y:
            BOUNDARIES.top +
            (BOUNDARIES.bottom -
              PROJECTILE_DIMENSIONS.height -
              BOUNDARIES.top) *
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
    let projRight = proj.position.x + PROJECTILE_DIMENSIONS.width;
    let projBottom = proj.position.y + PROJECTILE_DIMENSIONS.height;
    if (proj.direction == "up" || proj.direction == "down") {
      projRight = proj.position.x + PROJECTILE_DIMENSIONS.height;
      projBottom = proj.position.y + PROJECTILE_DIMENSIONS.width;
    }
    if (
      ((playerPosition.x + PLAYER_DIMENSIONS.width > proj.position.x &&
        proj.position.x > playerPosition.x) ||
        (playerPosition.x + PLAYER_DIMENSIONS.width > projRight &&
          projRight > playerPosition.x)) &&
      ((playerPosition.y + PLAYER_DIMENSIONS.height > proj.position.y &&
        proj.position.y > playerPosition.y) ||
        (playerPosition.y + PLAYER_DIMENSIONS.height > projBottom &&
          projBottom > playerPosition.y))
    ) {
      setGameOver(true);
    }
  }
};
