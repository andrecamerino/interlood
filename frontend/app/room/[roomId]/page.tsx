"use client";
import { use, useEffect, useState } from "react";
import { Player } from "@shared/types/Player";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

export const Page = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = use(params);
  const [players, setPlayers] = useState<Player[]>([]); // TODO: dont use Player class on frontend, should use Player interface from /shared

  useEffect(() => {
    socket.on("room updated", (room) => {
      setPlayers(room.players);
    });
    return () => {
      socket.off("room updated");
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>Room ID: {roomId}</h1>
      <div className="flex flex-col">
        {players.map((player, index) => (
          <p key={index}>
            {index + 1}. {player.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Page;
