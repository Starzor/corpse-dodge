import "./styles/App.css";
import Menu from "./Menu/Menu";
import { useState } from "react";
import Game from "./Game/Game";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const App = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mainContainer">
      {!playing && <Menu startGame={() => setPlaying(true)} />}
      {playing && <Game goToMenu={() => setPlaying(false)} />}
    </div>
  );
};

const firebaseConfig = {
  apiKey: "AIzaSyAJK-1WxX3tDvmI1OBIaCIA-Oa54oamVEI",
  authDomain: "corpse-dodge.firebaseapp.com",
  projectId: "corpse-dodge",
  storageBucket: "corpse-dodge.appspot.com",
  messagingSenderId: "113918464287",
  appId: "1:113918464287:web:2d5466f6615002aa13a02a",
};

const app = initializeApp(firebaseConfig);
export default App;
export const db = getFirestore(app);