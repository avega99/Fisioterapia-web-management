import { IUser } from "./user.types";

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoggedUser extends IUser {
    accessToken: string;
}

export interface RefreshToken {
    accessToken: string;
}
