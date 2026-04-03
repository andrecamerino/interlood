"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3002");

const CreateRoom = () => {
  const [roomId, setRoomId] = useState<string | null>(null);

  const handleCreate = () => {
    socket.emit("create room");
  };

  // listen for room created
  // socket.on("room created", ...) goes in useEffect

  useEffect(() => {
    socket.on("room created", (roomId: string) => {
      setRoomId(roomId);
    });

    return () => {
      socket.off("room created");
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h2>Create Room</h2>
        {roomId ? (
          <h2>Room Code: {roomId}</h2>
        ) : (
          <button className="hover:underline" onClick={handleCreate}>
            Create Room
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
