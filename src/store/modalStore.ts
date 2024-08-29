import { create } from "zustand";

export enum BodyType {
    ADD_NEW_PLAYER = "ADD_NEW_PLAYER",
    DEFAULT = "DEFAULT",
}

export interface IModal {
    title: string;
    isOpen: boolean;
    bodyType: BodyType;
    size: string;
    openModal: (data: OpenModalOptions) => void;
    closeModal: () => void;
}

export interface OpenModalOptions {
    title: string;
    bodyType: BodyType;
    size?: string;
}

export const useModalStore = create<IModal>((set) => {
    return {
        title: "",
        isOpen: false,
        bodyType: BodyType.DEFAULT,
        size: "",
        openModal: ({ bodyType, title, size }) => {
            set({ bodyType, isOpen: true, size: size || "md", title });
        },
        closeModal: () => {
            set({ isOpen: false, bodyType: BodyType.DEFAULT, title: "" });
        },
    };
});
