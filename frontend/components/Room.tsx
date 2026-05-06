"use client";
import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

const Room = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("room updated", (room) => {
      setPlayers(room.players.map((p: { name: string }) => p.name));
    });

    socket.on("join error", (msg: string) => {
      setError(msg);
    });

    return () => {
      socket.off("room updated");
      socket.off("join error");
    };
  }, []);

  const handleJoin = () => {
    if (!name) return;
    socket.emit("user join", name);
  };

  return (
    <div>
      <h1>Room</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleJoin}>Join Room</button>
      <ul>
        {players.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
