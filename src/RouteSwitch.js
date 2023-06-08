import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Game from "./Game";
import { useState } from "react";
const RouteSwitch = () => {
  const [currentGame, setCurrentGame] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App setCurrentGame={setCurrentGame} />} />
        <Route
          path="/game"
          element={
            <Game currentGame={currentGame} setCurrentGame={setCurrentGame} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
