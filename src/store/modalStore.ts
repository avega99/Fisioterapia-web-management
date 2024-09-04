import { ICheckup } from "@/global/checkups.types";
import { IPlayer } from "@/global/player.types";
import { create } from "zustand";

export enum BodyType {
    ADD_NEW_PLAYER = "ADD_NEW_PLAYER",
    DELETE_CHECKUP = "DELETE_CHECKUP",
    DEFAULT = "DEFAULT",
}

export interface ExtraDataCheckup {
    type: "DeleteCheckup";
    data: ICheckup;
}
export interface ExtradDataPlayer {
    type: "DeletePlayer";
    data: IPlayer;
}

export type ExtraDataModal = ExtraDataCheckup | ExtradDataPlayer;

export interface IModal {
    title: string;
    isOpen: boolean;
    bodyType: BodyType;
    size: string;
    extraData: ExtraDataModal | null;
    openModal: (data: OpenModalOptions) => void;
    closeModal: () => void;
}

export interface OpenModalOptions {
    title: string;
    bodyType: BodyType;
    size?: string;
    extraData?: ExtraDataModal;
}

export const useModalStore = create<IModal>((set) => {
    return {
        title: "",
        isOpen: false,
        bodyType: BodyType.DEFAULT,
        size: "",
        extraData: null,
        openModal: ({ bodyType, title, size, extraData }) => {
            set({ bodyType, isOpen: true, size: size || "md", title, extraData: extraData ? extraData : null });
        },
        closeModal: () => {
            set({ isOpen: false, bodyType: BodyType.DEFAULT, title: "", extraData: null });
        },
    };
});
