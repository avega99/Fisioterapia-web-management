import { ICheckupMedia } from "./checkupMedia.interfaces";
import { IPlayer, PLAYER_STATUS } from "./player.types";
import { IUser } from "./user.types";

export interface ICheckup {
    id: number;
    notes: string;
    tests: string;
    results: string;
    createdById: number;
    playerId: number;
    player_status: PLAYER_STATUS;
    appointment_date: string;
    createdAt: string;
    updatedAt: string;
    player: IPlayer;
    createdBy: IUser;
}

export interface ICheckupDetails extends ICheckup {
    media: ICheckupMedia[];
}

export interface ICheckupForm {
    assets: FileList;
    tests: string;
    notes: string;
    results: string;
    appointment_date: string;
    player_status: PLAYER_STATUS;
    player: IPlayer;
}

export interface IEditCheckupForm {
    tests: string;
    notes: string;
    results: string;
    player: IPlayer;
    appointment_date: string;
    player_status: PLAYER_STATUS;
}
