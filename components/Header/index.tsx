"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect } from "react";

export default function Header({ routeLabel }: { routeLabel?: string }) {
  const { name, load: loadUserData } = useUserStore((state) => state);
  const title = "Who's Your Main?";
  const fullLabel = routeLabel ? `${title}/${routeLabel}` : title;

  async function loadUser() {
    try {
      const response = await fetch(`http://localhost:3001/users/${1}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        referrerPolicy: "no-referrer",
      });
      const data = await response.json();
      console.log("loadUser data: ", data);
      if (data.length > 0) {
        const user = data[0];
        loadUserData({ name: user.name });
        console.log("user: ", user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Label className="text-3xl">{fullLabel}</Label>
        <div className="flex items-center gap-4">
          <a href="/choose-game">
            <Button>Add a main</Button>
          </a>
          <Label>{name}</Label>
        </div>
      </div>
      <hr />
    </>
  );
}
