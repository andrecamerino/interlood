"use client";
import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

const JoinRoom = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  // TODO: separate join and create room components
  const [roomCode, setRoomCode] = useState<string | null>(null); // seperate for now
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [roomJoined, setRoomJoined] = useState<boolean>(false);
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState<{id: string, name: string}[]>([]);

  const handleCreate = () => {
    socket.emit("create room");
  };

  useEffect(() => {
    socket.on("room created", (roomId: string) => {
      setRoomId(roomId);
      setRoomCode(roomId);
      setRoomJoined(true);
      setIsHost(true); // ← track that this client is the host
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
      setPlayers(room.players); // ← store players
    });

    return () => {
      socket.off("room updated"); // ← add this
    };
  }, []);

  return (
    <div>
      {!isHost && !roomJoined && (
        <div>
          <h2>Join Room</h2>
          <input placeholder="Room code" onChange={(e) => setRoomCode(e.target.value)} />
          <input placeholder="Your name" onChange={(e) => setPlayerName(e.target.value)} />
          <button onClick={handleJoin}>Join Room</button>

          <h2>Create Room</h2>
          <button onClick={handleCreate}>Create Room</button>
        </div>
      )}

      {isHost && <h2>Room Code: {roomId}</h2>}
      {!isHost && roomJoined && <p>Joined Room: {roomCode}</p>}

      {roomJoined && (
        <div>
          <h3>Players in room:</h3>
          <ul>
            {players.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
