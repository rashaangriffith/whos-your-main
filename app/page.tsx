"use client";

import GameButton from "@/components/GameButton";
import Header from "@/components/Header";
import { useUserStore } from "@/providers/user-store-provider";
import { UserGameCharacter } from "@/types/UserGameCharacter";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [userGameCharacters, setUserGameCharacters] = useState<
    Array<UserGameCharacter>
  >([]);
  const { id: userId } = useUserStore((state) => state);

  useEffect(() => {
    async function loadUserGameCharacters() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user-gamecharacters/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            referrerPolicy: "no-referrer",
          }
        );
        const userGameCharacters = await response.json();
        setUserGameCharacters(userGameCharacters);
      } catch (error) {
        console.error(error);
      }
    }

    if (userId) {
      loadUserGameCharacters();
    }
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8">
      <Header />
      <div className="flex flex-wrap gap-4">
        {userGameCharacters.map((userGameCharacter) => (
          <div key={userGameCharacter.id} className="bg-gray-200">
            <div
            // className="flex flex-col items-center"
            // style={{ maxWidth: "25%", height: "auto" }}
            >
              {/* {onButtonClick && (
                <Button onClick={handleButtonClick}>{`Add ${label}`}</Button>
              )} */}
              <Image
                src={userGameCharacter.gameCharacter?.character?.imageUrl || ""}
                alt={userGameCharacter.gameCharacter?.character?.name || ""}
                width={200}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
