const TitleScreen = (props) => {
  const { startGame, setActiveMenuSection } = props;
  return (
    <>
      <p className="title">Corpse dodge</p>
      <button className="menuButton" onClick={startGame}>
        Play
      </button>
      <button
        className="menuButton"
        onClick={() => setActiveMenuSection("hallOfFame")}
      >
        Hall of Fame
      </button>
      <button
        className="menuButton"
        onClick={() => setActiveMenuSection("howToPlay")}
      >
        How to play
      </button>
    </>
  );
};

export default TitleScreen;