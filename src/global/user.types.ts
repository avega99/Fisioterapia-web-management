export enum USER_ROLE {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    WRITE = "WRITE",
    READ = "READ",
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
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
}
