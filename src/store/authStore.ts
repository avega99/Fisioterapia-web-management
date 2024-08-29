import { create } from "zustand";
import { ILoggedUser } from "../global/auth.types";

export interface IAuth {
    user: ILoggedUser | null;
    setUser: (data: ILoggedUser | null) => void;
    logout: VoidFunction;
}

export const useAuthStore = create<IAuth>((set) => ({
    user: null,
    setUser: (user: ILoggedUser | null) => set({ user }),
    logout: () => set({ user: null }),
}));
