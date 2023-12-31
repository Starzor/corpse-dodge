import "../../styles/Game/GameBoard/Projectile.css";
import knife from "../../images/knife.png";
import knife_vertical from "../../images/knife_vertical.png";

const Projectile = (props) => {
  const { position, direction } = props;
  return (
    <div
      className="projectile"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      {direction != "up" && direction != "down" && (
        <img src={knife} className={direction} />
      )}
      {(direction == "up" || direction == "down") && (
        <img src={knife_vertical} className={direction} />
      )}
    </div>
  );
};
export default Projectile;