import { GameCharacter } from "./GameCharacter";

export interface UserGameCharacter {
  id: number;
  userId: number;
  gameCharacterId: number;
  gameCharacter?: GameCharacter;
}
