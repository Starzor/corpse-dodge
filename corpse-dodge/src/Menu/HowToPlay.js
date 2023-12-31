const HowToPlay = (props) => {
  const { returnToMenu } = props;
  return (
    <>
      <p className="title">How to Play</p>
      <p className="paragraph">
        You will have projectiles firing at you from all four directions, use
        the arrow keys to maneuver around the playing field and survive for as
        long as possible!
      </p>
      <button className="menuButton" onClick={returnToMenu}>
        Return
      </button>
    </>
  );
};

export default HowToPlay;
