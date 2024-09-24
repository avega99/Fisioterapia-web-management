export enum PLAYER_STATUS {
    AVAILABLE = "AVAILABLE",
    TRAINING = "TRAINING",
    INJURED = "INJURED",
}

export enum PLAYER_CATEGORY {
    SUB_19 = "SUB_19",
    SUB_23 = "SUB_23",
}

export interface IPlayer {
    id: number;
    player_name: string;
    last_name: string;
    squad_number: number;
    category: PLAYER_CATEGORY;
    avatar: string | null;
    avatar_name: string | null;
    avatar_path: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IPlayerDetails extends IPlayer {
    player_status: PLAYER_STATUS;
}

export interface IPlayerForm {
    player_name: string;
    last_name: string;
    squad_number: string | number;
    category: PLAYER_CATEGORY;
    avatar?: FileList;
}
export interface IEditPlayerForm extends Omit<IPlayerForm, "avatar"> {
    avatar?: string | FileList | null;
    id: number | string;
}
