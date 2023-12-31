import "../styles/Menu/Menu.css";
import { useState, useEffect } from "react";
import TitleScreen from "./TitleScreen";
import HallOfFame from "./HallOfFame";
import HowToPlay from "./HowToPlay";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../App";

const Menu = (props) => {
  const { startGame } = props;
  const [activeMenuSection, setActiveMenuSection] = useState("titleScreen");
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
    <div className="menuContainer">
      {activeMenuSection == "titleScreen" && (
        <TitleScreen
          setActiveMenuSection={setActiveMenuSection}
          startGame={startGame}
        />
      )}
      {activeMenuSection == "hallOfFame" && (
        <HallOfFame
          returnToMenu={() => setActiveMenuSection("titleScreen")}
          scores={scores}
        />
      )}
      {activeMenuSection == "howToPlay" && (
        <HowToPlay returnToMenu={() => setActiveMenuSection("titleScreen")} />
      )}
    </div>
  );
};

export default Menu;