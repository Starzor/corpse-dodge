import "../../styles/Game/GameOver/PlayOrMenu.css";

const PlayOrMenu = (props) => {
  const { goToMenu, playAgain } = props;
  return (
    <>
      <p>Thank you for playing!</p>
      <div className="postGameButtonContainer">
        <button className="postGameButton" onClick={playAgain}>
          Play again!
        </button>
        <button className="postGameButton" onClick={goToMenu}>
          Back to menu
        </button>
      </div>
    </>
  );
};

export default PlayOrMenu;