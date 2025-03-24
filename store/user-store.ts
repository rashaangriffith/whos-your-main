import { createStore } from "zustand/vanilla";

export type CharacterState = {
  name: string;
  description?: string;
  imageUrl?: string;
};

export type UserState = {
  email: string;
  firstName?: string;
  lastName?: string;
  characters: Array<CharacterState>;
};

export type UserActions = {
  load: (userData: UserState) => void;
  addCharacter: (character: CharacterState) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  email: "",
  characters: [],
};

export const createUserStore = (initState: UserState = defaultInitState) =>
  createStore<UserStore>((set) => ({
    ...initState,
    load: (userData: UserState) =>
      set((state) => {
        console.log("load user, set data: ", userData);
        return {
          ...state,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        };
      }),
    addCharacter: (character: CharacterState) =>
      set((state) => ({ characters: [...state?.characters, character] })),
  }));
