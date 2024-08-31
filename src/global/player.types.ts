export enum PLAYER_STATUS {
    AVAILABLE = "AVAILABLE",
    TRAINING = "TRAINING",
    INJURED = "INJURED",
}

export enum PLAYER_CATEGORY {
    AVAILABLE = "AVAILABLE",
    TRAINING = "TRAINING",
    INJURED = "INJURED",
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
