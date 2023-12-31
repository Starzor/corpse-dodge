import { useState } from "react";
import { db } from "../../storeconfig";
import { addDoc, collection } from "firebase/firestore";
import "../../styles/Game/GameOver/RecordScore.css";
import "../../styles/Game/GameOver/GameOver.css";

const RecordScore = (props) => {
  const { setNameSubmitted, score } = props;
  const [name, setName] = useState("");

  const submitNameHandler = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "Scores"), {
      playerName: name,
      score: score,
    });
    console.log("Document written with ID: ", docRef.id);
    setNameSubmitted(true);
  };

  return (
    <form onSubmit={submitNameHandler}>
      <label htmlFor="scoreInput">Enter your name:</label>
      <input
        id="scoreInput"
        className="scoreInput"
        onChange={(event) => setName(event.target.value)}
      />
    </form>
  );
};

export default RecordScore;