import { Character } from "./Character";
import { GameCharacter } from "./GameCharacter";

export interface Game {
  id: number;
  title: string;
  description?: string;
  year?: number;
  platform?: string;
  imageUrl?: string;
  characters: Array<Character>;
  gameCharacters: Array<GameCharacter>;
}
