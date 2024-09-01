import { create } from "zustand";
import { INotificationPayload } from "../global/common.types";

export interface IHeader {
    title: string;
    newNotificationMessage: string;
    newNotificationStatus: number;
    setTitle: (title: string) => void;
    showNotification: (data: INotificationPayload) => void;
    removeNotificationMessage: VoidFunction;
}

export const useHeaderStore = create<IHeader>((set) => {
    return {
        setTitle: (title: string) => {
            set({ title });
        },
        title: "Home",
        newNotificationMessage: "",
        newNotificationStatus: 1,
        showNotification: (data: INotificationPayload) => set({ newNotificationMessage: data.message, newNotificationStatus: data.status }),
        removeNotificationMessage: () => set({ newNotificationMessage: "" }),
    };
});
