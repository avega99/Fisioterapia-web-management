import { ICheckupMedia } from "@/global/checkupMedia.interfaces";
import { ICheckup } from "@/global/checkups.types";
import { IPlayer } from "@/global/player.types";
import { create } from "zustand";

export enum BodyType {
    ADD_NEW_CHECKUP = "ADD_NEW_CHECKUP",
    DELETE_CHECKUP = "DELETE_CHECKUP",
    DELETE_PLAYER = "DELETE_PLAYER",
    DELETE_ASSET = "DELETE_ASSET",
    EDIT_PLAYER = "EDIT_PLAYER",
    ADD_PLAYER = "ADD_PLAYER",
    DEFAULT = "DEFAULT",
}

export interface ExtraDataCheckup {
    type: "DeleteCheckup";
    data: ICheckup;
}

export interface ExtraDataPlayer {
    type: "player";
    data: IPlayer;
    page: number;
}


export interface ExtraDataAsset {
    type: "DeleteAsset";
    data: ICheckupMedia;
}

export type ExtraDataModal = ExtraDataCheckup | ExtraDataPlayer | ExtraDataAsset;

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
