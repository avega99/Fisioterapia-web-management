import { IPlayer } from "./player.types";

export enum USER_ROLE {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    WRITE = "WRITE",
    READ = "READ",
    PLAYER = "PLAYER",
}
export enum USER_STATUS {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
}

export interface IUser {
    id: number;
    email: string;
    password: string;
    name: string;
    last_name: string;
    avatar: null | string;
    avatar_name: null | string;
    role: USER_ROLE;
    status: USER_STATUS;
    playerId?: number;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAddUserForm {
    id: string | number;
    email: string;
    name: string;
    password: string;
    role: USER_ROLE;
    status: USER_STATUS;
    last_name: string;
    avatar?: FileList;
    player?: IPlayer;
}

export interface IEditUserForm extends Omit<IAddUserForm, "avatar" | "password"> {
    avatar?: FileList | string;
}

export interface IEditMyProfileForm {
    name: string;
    last_name: string;
    email: string;
    avatar?: FileList | string;
}
