import { create } from "zustand";

export interface IHeader {
    title: string;
    setTitle: (title: string) => void;
}

export const useHeaderStore = create<IHeader>((set) => {
    return {
        setTitle: (title: string) => {
            set({ title });
        },
        title: "Home",
    };
});
