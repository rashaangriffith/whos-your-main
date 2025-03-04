"use client";

import GameButton from "@/components/GameButton";
import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ChooseGame() {
  const [characters, setCharacters] = useState<Array<any>>([]);
  const gameData = [
    {
      id: 1,
      name: "Street Fighter 6",
      characters: [
        {
          id: 1,
          name: "Ryu",
        },
        {
          id: 2,
          name: "Ken",
        },
        {
          id: 3,
          name: "Chun-Li",
        },
      ],
    },
    {
      id: 2,
      name: "Tekken 8",
      characters: [
        {
          id: 1,
          name: "Heihachi",
        },
        {
          id: 2,
          name: "Kazuya",
        },
        {
          id: 3,
          name: "Jin",
        },
      ],
    },
  ];

  function handleGameClick({ id, name }: { id: number; name: string }) {
    const game = gameData.find((game) => game.id === id);
    setCharacters(game?.characters || []);
  }

  function handleCharacterClick({ id, name }: { id: number; name: string }) {
    alert(`Selected character: ${name}`);
  }

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8">
      <Header />
      <Label className="text-4xl">Games</Label>
      <div className="flex flex flex-wrap gap-4">
        {gameData.map((game) => (
          <GameButton
            key={game.id}
            id={game.id}
            name={game.name}
            onClick={handleGameClick}
          />
        ))}
      </div>
      <hr />
      <div className="flex flex flex-wrap gap-4">
        {characters.map((character) => (
          <GameButton
            key={character.id}
            id={character.id}
            name={character.name}
            onClick={handleCharacterClick}
          />
        ))}
      </div>
    </div>
  );
}
