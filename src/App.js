import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
function App({ setCurrentGame }) {
  const [game, setGame] = useState("bee");
  const intervalIdRef = useRef(null);
  const imgArray = ["bee", "cat", "lollipop", "rick"]; //you will get values from the database

  useEffect(() => {
    randomGame();
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);
  function randomGame() {
    intervalIdRef.current = setInterval(() => {
      setGame(imgArray[(imgArray.length * Math.random()) | 0]);
    }, 33);
  }
  function handleMouseEnter() {
    clearInterval(intervalIdRef.current);
  }
  function handleMouseLeave() {
    randomGame();
  }
  function handleClick() {
    setCurrentGame(game);
  }
  return (
    <div className="App">
      <Link
        to="/game"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        Where's {game}
      </Link>
    </div>
  );
}

export default App;
