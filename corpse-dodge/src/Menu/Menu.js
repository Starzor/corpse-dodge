import "../styles/Menu/Menu.css";
import { useState } from "react";
import TitleScreen from "./TitleScreen";
import HallOfFame from "./HallOfFame";
import HowToPlay from "./HowToPlay";

const Menu = (props) => {
  const { startGame } = props;
  const [activeMenuSection, setActiveMenuSection] = useState("titleScreen");

  return (
    <div className="menuContainer">
      {activeMenuSection == "titleScreen" && (
        <TitleScreen
          setActiveMenuSection={setActiveMenuSection}
          startGame={startGame}
        />
      )}
      {activeMenuSection == "hallOfFame" && (
        <HallOfFame returnToMenu={() => setActiveMenuSection("titleScreen")} />
      )}
      {activeMenuSection == "howToPlay" && (
        <HowToPlay returnToMenu={() => setActiveMenuSection("titleScreen")} />
      )}
    </div>
  );
};

export default Menu;