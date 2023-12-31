import "../../styles/Game/GameBoard/Player.css";

const Player = (props) => {
  const { position, playerDirection, isMoving } = props;
  return (
    <div
      className={`character ${playerDirection} ${isMoving && "walking"}`}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    ></div>
  );
};
export default Player;