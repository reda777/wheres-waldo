import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
function App() {
  const [game, setGame] = useState("Bee");
  const intervalIdRef = useRef(null);

  const imgArray = ["Bee", "Cat", "Waldo", "Hollow"]; //you will get values from the database

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
  return (
    <div className="App">
      <Link
        to="/game"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Where's {game}
      </Link>
    </div>
  );
}

export default App;
