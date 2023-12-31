import { collection, getDocs } from "firebase/firestore";
import { db } from "../App";
import { useEffect, useState } from "react";

const HallOfFame = (props) => {
  const { returnToMenu } = props;
  const [scores, setScores] = useState([]);

  const fetchScores = async () => {
    await getDocs(collection(db, "Scores")).then((querySnapshot) => {
      const newScores = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setScores(newScores.sort((a, b) => b.score - a.score).slice(0, 10));
      console.log(newScores);
    });
  };

  useEffect(() => {
    fetchScores();
  });

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