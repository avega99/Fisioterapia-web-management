import { CheckupMedia } from "./checkupMedia.interfaces";
import { IPlayer } from "./player.types";
import { IUser } from "./user.types";

export interface ICheckup {
    id: number;
    notes: string;
    tests: string;
    results: string;
    createdById: number;
    playerId: number;
    createdAt: string;
    updatedAt: string;
    player: IPlayer;
    createdBy: IUser;
}

export interface ICheckupDetails extends ICheckup {
    media: CheckupMedia[];
}

export interface ICheckupForm {
    assets: FileList;
    tests: string;
    notes: string;
    results: string;
    player: IPlayer;
}
