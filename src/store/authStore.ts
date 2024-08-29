import { create } from "zustand";
import { ILoggedUser } from "../global/auth.types";
import { getPersist } from "../utils/persist";

export interface IAuth {
    user: ILoggedUser | null;
    setUser: (data: ILoggedUser | null) => void;
    togglePersist: () => void;
    persists: boolean;
}

export const useAuthStore = create<IAuth>((set) => ({
    user: null,
    persists: getPersist(),
    setUser: (user: ILoggedUser | null) => set({ user }),
    togglePersist: () => {
        set((state) => {
            const newValue = !state.persists;
            localStorage.setItem("persist", JSON.stringify(newValue));
            return {
                persists: newValue,
            };
        });
    },
}));
