"use client";

import { useState } from "react";
import { WavelengthGame } from "../models/WavelengthGame";
import { WavelengthPlayer } from "../models/WavelengthPlayer";

const GameUI = () => {
  const [game] = useState<WavelengthGame>(new WavelengthGame([]));
  const [players, setPlayers] = useState<WavelengthPlayer[]>(game.getPlayers());
  const [playerAddedText, setPlayerAddedText] = useState<string>("");
  const [isShowingTargetNumber, setIsShowingTargetNumber] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [selectedWord, setSelectedWord] = useState<string>("");

  const handleAddPlayer = () => {
    if (!name) return;
    const addPlayerStatus = game.addPlayer(name);
    if (addPlayerStatus) {
      refreshPlayers();
      setPlayerAddedText(`Successfully added '${name}'`);
      setTimeout(() => {
        setPlayerAddedText("");
        setName("");
      }, 3000);
    } else {
      setPlayerAddedText(`Name '${name}' already taken`);
    }
  };

  const handleRemovePlayer = (name: string) => {
    game.removePlayer(name);
    refreshPlayers();
  };
  
  const handleStartGame = () => {
    game.startGame();
    refreshPlayers();
    setIsShowingTargetNumber(false);
    setSelectedWord("");
  };

  const handleStartGuessing = () => {
    game.setSelectedWord(selectedWord);
    game.startGuessing();
  };

  const handleSubmitNumbers = () => {
    game.reveal();
    refreshPlayers();
    setIsShowingTargetNumber(true);
    setTimeout(() => {
      handleEndGame();
    }, 5000);
  };

  const handleEndGame = () => {
    game.endGame();
    refreshPlayers();
  };

  const refreshPlayers = () => {
    setPlayers([...game.getPlayers()]);
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <h1>WAVELENGTH</h1>
      <p>Phase: {game.getPhase()}</p>

      {game.getCurrentCategory() && (
        <div>
          <h2>
            Category: {game.getCurrentCategory().category} |{" "}
            {game.getMinNumber()}: {game.getCurrentCategory().minLabel} -&gt;{" "}
            {game.getMaxNumber()}: {game.getCurrentCategory().maxLabel}
          </h2>
        </div>
      )}

      {game.getCurrentTarget() !== 0 && (
        <div className="flex flex-row gap-2">
          <h2>
            Target Number: {isShowingTargetNumber ? game.getCurrentTarget() : "___"}
          </h2>
          <button
            className="hover:underline hover:cursor-pointer"
            onClick={() => setIsShowingTargetNumber(!isShowingTargetNumber)}
          >
            {isShowingTargetNumber ? "Hide" : "Show"} Target Number
          </button>
        </div>
      )}

      {players.length > 0 && <h2>Host: {game.getHost().getName()}</h2>}

      {game.getCurrentCategory() &&
        (game.canSelectWord() ? (
          <div className="flex flex-row gap-2">
            <p>Selected Word: </p>
            <input
              type="text"
              value={selectedWord}
              onChange={(e) => setSelectedWord(e.target.value)}
              placeholder="Input Here"
            />
            <button
              className="hover:underline hover:cursor-pointer"
              onClick={handleStartGuessing}
            >
              Submit Word
            </button>
          </div>
        ) : (
          <p>Selected Word: {selectedWord}</p>
        ))}

      <div className="flex flex-col gap-4 py-4">
        {players.map((player) => (
          <div key={player.getId()} className="flex flex-row gap-2">
            <p>
              {player.getName()}: Points: {player.getScore()}
            </p>

            {game.isHost(player) ? (
              "Selecting Word (Host)"
            ) : game.canGuess() ? (
              <div className="flex flex-row gap-2">
                <p>Number Guess: </p>
                <input
                  type="number"
                  min={game.getMinNumber()}
                  max={game.getMaxNumber()}
                  onChange={(e) => player.setSelectedNumber(Number(e.target.value))}
                  placeholder="Select number"
                />
              </div>
            ) : null}

            <button
              className="hover:underline hover:cursor-pointer"
              onClick={() => handleRemovePlayer(player.getName())}
            >
              Remove Player
            </button>
          </div>
        ))}
      </div>

      <button
        className="hover:underline hover:cursor-pointer"
        onClick={handleStartGame}
      >
        Start New Round
      </button>

      {game.canReveal() && (
        <button
          className="hover:underline hover:cursor-pointer"
          onClick={handleSubmitNumbers}
        >
          Submit Number Choices
        </button>
      )}

      <div>
        <h2>Leaderboard</h2>
        {game.getLeaderboard().map((player, index) => (
          <p key={player.getId()}>
            {index + 1}. {player.getName()}: {player.getScore()}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player name"
      />

      <button
        className="hover:underline hover:cursor-pointer"
        onClick={handleAddPlayer}
      >
        Add Player
      </button>

      <p>{playerAddedText}</p>
    </div>
  );
};

export default GameUI;