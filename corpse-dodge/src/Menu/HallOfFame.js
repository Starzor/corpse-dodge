const HallOfFame = (props) => {
  const { returnToMenu, scores } = props;

  return (
    <>
      <p className="title">Hall of Fame</p>
      {scores.map((record) => (
        <p className="paragraph">
          {scores.indexOf(record) + 1}. {record.playerName} - {record.score}
        </p>
      ))}
      <button className="menuButton" onClick={returnToMenu}>
        Return
      </button>
    </>
  );
};

export default HallOfFame;