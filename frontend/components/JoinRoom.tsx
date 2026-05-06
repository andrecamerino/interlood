"use client";
import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

const CreateRoom = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  // TODO: seperate join and create room components
  const [roomCode, setRoomCode] = useState<string | null>(null); // seperate for now
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [roomJoined, setRoomJoined] = useState<boolean>(false);

  const handleCreate = () => {
    socket.emit("create room");
  };

  useEffect(() => {
    socket.on("room created", (roomId: string) => {
      setRoomId(roomId);
    });

    return () => {
      socket.off("room created");
    };
  }, []);

  const handleJoin = () => {
    socket.emit("user join", roomCode, playerName);
  };

  useEffect(() => {
    socket.on("room updated", (room) => {
      setRoomId(room.id);
      setRoomJoined(true);
    });
  }, []);

  return (
    // TODO: use useRouter
    <div>
      <div>
        <h2>Join Room</h2>
        {!roomJoined ? (
          <div>
            <input
              type="text"
              name="roomCode"
              id="roomCode"
              onChange={(e) => {
                setRoomCode(e.target.value);
              }}
            />
            {/* TODO: join room first then make player name */}
            <input
              type="text"
              name="playerName"
              id="playerName"
              onChange={(e) => {
                setPlayerName(e.target.value);
              }}
            />
          </div>
        ) : (
          <p>Joined Room: {roomCode}</p>
        )}
      </div>
      <button onClick={handleJoin}>Join Room</button>
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
