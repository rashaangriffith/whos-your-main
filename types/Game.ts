import { Character } from "./Character";

export interface Game {
  id: number;
  title: string;
  description?: string;
  year?: number;
  platform?: string;
  imageUrl?: string;
  characters: Array<Character>;
}
