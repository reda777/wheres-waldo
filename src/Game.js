import bee from "./images/find-bee.png";
import cat from "./images/find-cat.jpg";
import lollipop from "./images/find-lollipop.png";
import rick from "./images/egor-klyuchnyk-1.jpg";
import { useState } from "react";
function Game({ currentGame, setCurrentGame }) {
  const getImg = { bee: bee, cat: cat, lollipop: lollipop, rick: rick }; //get from firebase
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    setPos({ x: event.clientX, y: event.clientY });
  }
  function handleMouseEnter() {
    document.querySelector(".custom-cursor").classList.toggle("hidden");
  }
  function handleMouseLeave() {
    document.querySelector(".custom-cursor").classList.toggle("hidden");
  }
  return (
    <div className="Game">
      <div className="game-timer" data-testid="game-timer"></div>
      <div
        className="custom-cursor hidden"
        data-testid="custom-cursor"
        style={{ left: pos.x, top: pos.y }}
      >
        <div className="custom-cursor-inner"></div>
      </div>
      <div
        className="game-img"
        data-testid="game-img"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={getImg[currentGame]} alt="where's waldo" />
      </div>
      <div className="game-find"></div>
    </div>
  );
}
export default Game;
