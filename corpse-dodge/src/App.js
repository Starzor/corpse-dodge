import "./styles/App.css";
import Menu from "./Menu/Menu";
import { useState } from "react";
import Game from "./Game/Game";

const App = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mainContainer">
      {!playing && <Menu startGame={() => setPlaying(true)} />}
      {playing && <Game goToMenu={() => setPlaying(false)} />}
    </div>
  );
};

export default App;