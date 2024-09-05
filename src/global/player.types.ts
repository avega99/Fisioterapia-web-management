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
    status: PLAYER_STATUS;
    category: PLAYER_CATEGORY;
    avatar: string | null;
    avatar_name: string | null;
    avatar_path: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IPlayerForm {
    player_name: string;
    last_name: string;
    squad_number: string | number;
    category: PLAYER_CATEGORY;
    status: PLAYER_STATUS;
    avatar?: FileList;
}
export interface IEditPlayerForm extends Omit<IPlayerForm, "avatar"> {
    avatar?: string | FileList | null;
    id: number | string;
}
