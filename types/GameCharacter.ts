import { Character } from "./Character";

export interface GameCharacter {
  id: number;
  gameId: number;
  characterId: number;
  imageUrl?: string;
  character?: Character;
}
