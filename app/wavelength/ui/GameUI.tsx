"use client";

import { useState } from "react";
import { WavelengthGame } from "../models/WavelengthGame";
import { WavelengthPlayer } from "../models/WavelengthPlayer";

const GameUI = () => {
  const [game, setGame] = useState<WavelengthGame>(new WavelengthGame([]));
  const [players, setPlayers] = useState<WavelengthPlayer[]>(game.getPlayers());
  const [isShowingTargetNumber, setIsShowingTargetNumber] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const handleAddPlayer = () => {
    if (!name) return;
    game.addPlayer(name);
    setName("");
  };

  const handleStartGame = () => {
    setGame(new WavelengthGame(players));
    // refreshPlayers();
    console.log(game);
    console.log(game.getCurrentCategory());
  };

  const handleEndGame = () => {
  game.handleRoundPoints();
  setPlayers([...game.getPlayers()]); // spread creates a new array reference
};

  return (
    <div className="flex flex-col gap-1 items-start">
      <h1>WAVELENGTH</h1>
      <h2>Category: {game.getCurrentCategory()}</h2>
      <h2>
        Target Number: {isShowingTargetNumber ? game.getCurrentTarget() : "___"}
      </h2>

      <button onClick={() => setIsShowingTargetNumber(!isShowingTargetNumber)}>
        Toggle Target Number
      </button>

      {players.length > 0 && <h2>Host: {game.getHost().getName()}</h2>}

      {players.map((player) => (
        <div key={player.getId()}>
          <p>
            {player.getName()}: {player.getScore()}
          </p>
          <input
            type="number"
            min={1}
            max={10}
            onChange={(e) => player.setSelectedNumber(Number(e.target.value))}
            placeholder="Select number"
          />
        </div>
      ))}

      <button
        onClick={() => {
          handleStartGame();
        }}
      >
        Start New Round
      </button>

      <button
        onClick={() => {
          handleEndGame();
        }}
      >
        Submit Number Choices
      </button>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player name"
      />

      <button onClick={handleAddPlayer}>Add Player</button>
    </div>
  );
};

export default GameUI;
