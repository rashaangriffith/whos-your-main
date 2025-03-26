"use client";

import GameButton from "@/components/GameButton";
import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/providers/user-store-provider";
import { Game } from "@/types/Game";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChooseGame() {
  const [games, setGames] = useState<Array<Game>>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { id: userId } = useUserStore((state) => state);

  function handleGameClick({ id }: { id: number }) {
    setSelectedGame(games.find((game) => game.id === id) || null);
  }

  async function handleCharacterClick({ id }: { id: number }) {
    const gameCharacter = selectedGame?.gameCharacters.find(
      (gc) => gc.characterId === id
    );

    const character = selectedGame?.characters.find((c) => c.id === id);

    if (!character || !gameCharacter) {
      return;
    }

    try {
      await fetch("http://localhost:3001/user-gamecharacters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          gameCharacterId: gameCharacter.id,
        }),
        mode: "cors",
        referrerPolicy: "no-referrer",
      });

      toast(`Added ${character?.name} to Mains`, {
        action: {
          label: "Undo",
          onClick: () => {
            console.log(`Removed ${character?.name} from Mains`);
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast(`Error adding ${character?.name} to Mains`);
    }
  }

  useEffect(() => {
    async function loadGames() {
      try {
        const response = await fetch(`http://localhost:3001/games`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          referrerPolicy: "no-referrer",
        });
        const data = await response.json();
        console.log("loadGames data: ", data);
        if (data) {
          setGames(data);
          console.log("game data: ", data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadGames();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8">
      <Header />
      <Label className="text-4xl">Games</Label>
      <div className="flex flex flex-wrap gap-4">
        {games.map((game) => (
          <GameButton
            key={game.id}
            id={game.id}
            label={game.title}
            imageUrl={game.imageUrl}
            onClick={handleGameClick}
          />
        ))}
      </div>
      <hr />
      <div className="flex flex-wrap gap-4">
        {selectedGame?.characters.map((character) => {
          const gameCharacterImageUrl = selectedGame.gameCharacters.find(
            (gc) => gc.characterId === character.id
          )?.imageUrl;

          return (
            <GameButton
              key={character.id}
              id={character.id}
              label={character.name}
              imageUrl={gameCharacterImageUrl || character.imageUrl}
              onButtonClick={handleCharacterClick}
            />
          );
        })}
      </div>
    </div>
  );
}
