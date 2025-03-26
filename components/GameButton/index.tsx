"use client";

import Image from "next/image";
// import Image from "next/image";
import { Button } from "../ui/button";

export default function GameButton({
  id,
  label,
  imageUrl,
  onClick,
  onButtonClick,
}: {
  id: number;
  label: string;
  imageUrl?: string;
  onClick?: ({ id }: { id: number }) => void;
  onButtonClick?: ({ id }: { id: number }) => void;
}) {
  function handleClick() {
    if (onClick) {
      return onClick({ id });
    }
  }

  function handleButtonClick() {
    if (onButtonClick) {
      return onButtonClick({ id });
    }
  }

  if (imageUrl) {
    return (
      <div
        className="flex flex-col items-center"
        style={{ maxWidth: "25%", height: "auto" }}
      >
        {onButtonClick && (
          <Button onClick={handleButtonClick}>{`Add ${label}`}</Button>
        )}
        <Image
          src={imageUrl}
          alt={label}
          width={200}
          height={200}
          onClick={handleClick}
        />
        {/* <img
          src={imageUrl}
          alt={label}
          onClick={handleClick}
          // style={{ width: "100%", height: "auto" }}
        /> */}
      </div>
    );
  }

  return <Button onClick={handleClick}>{label}</Button>;
}
