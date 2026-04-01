"use client";

import { useState } from "react";
import { WavelengthGame } from "../models/WavelengthGame";
import { WavelengthPlayer } from "../models/WavelengthPlayer";

const GameUI = () => {
  const [game, setGame] = useState<WavelengthGame>(new WavelengthGame([]));
  const [players, setPlayers] = useState<WavelengthPlayer[]>(game.getPlayers());
  const [playerAddedText, setPlayerAddedText] = useState<string>("");
  const [isShowingTargetNumber, setIsShowingTargetNumber] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const handleAddPlayer = () => {
    if (!name) return;
    const addPlayerStatus = game.addPlayer(name);
    if (addPlayerStatus) {
      setPlayerAddedText(`Succesfully added '${name}'`);
      setTimeout(() => {
        setPlayerAddedText("");
        setName("");
      }, 3000);
    } else {
      setPlayerAddedText(`Name '${name}' already taken`);
    }
  };

  const handleStartGame = () => {
    setGame(new WavelengthGame(players));
    setIsShowingTargetNumber(false);
  };

  const handleEndGame = () => {
    game.handleRoundPoints();
    setPlayers([...game.getPlayers()]); // spread creates a new array reference
    setIsShowingTargetNumber(true);
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <h1>WAVELENGTH</h1>
      {game.getCurrentCategory() && (
        <div>
          <h2>Category: {game.getCurrentCategory().category} | 1: {game.getCurrentCategory().minLabel} -{">"} 10:{" "}
            {game.getCurrentCategory().maxLabel}</h2>
        </div>
      )}

      {game.getCurrentTarget() != 0 && <div className="flex flex-row gap-2">
        <h2>
          Target Number:{" "}
          {isShowingTargetNumber ? game.getCurrentTarget() : "___"}
        </h2>

        <button
          className="className = hover:underline hover:cursor-pointer"
          onClick={() => setIsShowingTargetNumber(!isShowingTargetNumber)}
        >
          {isShowingTargetNumber ? "Hide" : "Show"} Target Number
        </button>
      </div>}

      {players.length > 0 && <h2>Host: {game.getHost().getName()}</h2>}

      {game.getCurrentCategory() && <div className="flex flex-row gap-2">
        <p>Selected Word: </p>
        <input
          type="text"
          // value={name}
          onChange={(e) => game.setSelectedWord(e.target.value)}
          placeholder="Input Here"
        />
      </div>}

      <div className="flex flex-col gap-4 py-4">
        {players.map((player) => (
          <div key={player.getId()} className="flex flex-col">
            <p>
              {player.getName()}: Points: {player.getScore()}
            </p>
            {game.getHost().getName() == player.getName() ? (
              "Selecting Word (Host)"
            ) : (
              <div className="flex flex-row gap-2">
                <p>Number Guess: </p>
                <input
                  type="number"
                  min={1}
                  max={10}
                  onChange={(e) =>
                    player.setSelectedNumber(Number(e.target.value))
                  }
                  placeholder="Select number"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="className = hover:underline hover:cursor-pointer"
        onClick={() => {
          handleStartGame();
        }}
      >
        Start New Round
      </button>

      {game.getCurrentCategory() && <button
        className="className = hover:underline hover:cursor-pointer"
        onClick={() => {
          handleEndGame();
        }}
      >
        Submit Number Choices
      </button>}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player name"
      />

      <button
        className="className = hover:underline hover:cursor-pointer"
        onClick={handleAddPlayer}
      >
        Add Player
      </button>
      <p>{playerAddedText}</p>
    </div>
  );
};

export default GameUI;
