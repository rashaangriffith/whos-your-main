import { createStore } from "zustand/vanilla";

export type CharacterState = {
  name: string;
};

export type UserState = {
  name: string;
  characters: Array<CharacterState>;
};

export type UserActions = {
  load: ({ name }: { name: string }) => void;
  addCharacter: (character: CharacterState) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  name: "",
  characters: [],
};

export const createUserStore = (initState: UserState = defaultInitState) =>
  createStore<UserStore>((set) => ({
    ...initState,
    load: ({ name }: { name: string }) =>
      set((state) => ({ ...state, name: name })),
    addCharacter: (character: CharacterState) =>
      set((state) => ({ characters: [...state.characters, character] })),
  }));
