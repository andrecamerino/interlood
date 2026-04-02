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

  const [selectedWord, setSelectedWord] = useState<string>("");
  const [hasSubmitWord, setHasSubmitWord] = useState<boolean>(false);

  const handleAddPlayer = () => {
    if (!name) return;
    const addPlayerStatus = game.addPlayer(name);
    if (addPlayerStatus) {
      refreshPlayers();
      setPlayerAddedText(`Succesfully added '${name}'`);
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
    setGame(new WavelengthGame(players))
    game.startGame()
    setIsShowingTargetNumber(false);
    setSelectedWord("");
    setHasSubmitWord(false);
  };

  const handleStartGuessing = () => {
    game.setSelectedWord(selectedWord);
    setHasSubmitWord(true);
    game.startGuessing();
  };

  const handleSubmitWords = () => {
    game.reveal();
    refreshPlayers();
    setIsShowingTargetNumber(true);
    setTimeout(() => {
      handleEndGame();
    }, 5000); // 5s
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
            {game.getMinNumber()}: {game.getCurrentCategory().minLabel} -{">"}{" "}
            {game.getMaxNumber()}: {game.getCurrentCategory().maxLabel}
          </h2>
        </div>
      )}

      {game.getCurrentTarget() != 0 && (
        <div className="flex flex-row gap-2">
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
        </div>
      )}

      {players.length > 0 && <h2>Host: {game.getHost().getName()}</h2>}

      {game.getCurrentCategory() &&
        (!hasSubmitWord ? (
          <div className="flex flex-row gap-2">
            <p>Selected Word: </p>
            <input
              type="text"
              value={selectedWord}
              onChange={(e) => {
                return !hasSubmitWord ? setSelectedWord(e.target.value) : null;
              }}
              placeholder="Input Here"
            />
            <button
              className="hover:underline hover:cursor-pointer"
              onClick={() => handleStartGuessing()}
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
        className="className = hover:underline hover:cursor-pointer"
        onClick={() => {
          handleStartGame();
        }}
      >
        Start New Round
      </button>

      {game.getCurrentCategory() && (
        <button
          className="className = hover:underline hover:cursor-pointer"
          onClick={() => {
            handleSubmitWords();
          }}
        >
          Submit Number Choices
        </button>
      )}

      <div>
        <h2>Leaderboard</h2>
        {players &&
          game.getLeaderboard().map((player, index) => {
            return (
              <p key={player.getId()}>
                {index + 1}. {player.getName()}: {player.getScore()}
              </p>
            );
          })}
      </div>

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
