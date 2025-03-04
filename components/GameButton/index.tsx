"use client";

import { Button } from "../ui/button";

export default function GameButton({
  id,
  name,
  onClick,
}: {
  id: number;
  name: string;
  onClick: ({ id, name }: { id: number; name: string }) => void;
}) {
  function handleClick() {
    return onClick({ id, name });
  }
  return (
    <Button key={id} onClick={handleClick}>
      {name}
    </Button>
  );
}
