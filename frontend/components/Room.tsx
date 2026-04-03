"use client";
import { useState } from "react";
import { io } from "socket.io-client";

// TODO: use .env var or find another way to do this socket stuff, best practice
const socket = io("http://localhost:3002"); // move outside component to avoid reconnecting on re-render

const Room = () => {
  const [name, setName] = useState<string>("");

  const handleJoin = () => {
    socket.emit("user join", name);
  };

  return (
    <div>
      <h1>Room</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleJoin} className="hover:underline hover:cursor-pointer">
        Join Room
      </button>
    </div>
  );
};

export default Room;