import { fetchScores } from "../storeconfig";
import { useEffect, useState } from "react";

const UPDATE_INTERVAL = 15 * 1000;

const HallOfFame = (props) => {
  const { returnToMenu } = props;
  const [scores, setScores] = useState([]);

  const fetchData = async () => {
    try {
      const newScores = await fetchScores();
      setScores(newScores);
      console.log("SUCCESS");
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

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