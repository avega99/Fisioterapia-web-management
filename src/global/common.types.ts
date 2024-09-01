import { AxiosInstance } from "axios";

export type ResponseStatus = "success" | "error" | "fail";

export interface IResponse<T> {
    status: ResponseStatus;
    message: string;
    data: T;
}

export interface IRequest<D> {
    axios: AxiosInstance;
    params: D;
}

export interface INotificationPayload {
    message: string;
    status: number;
}
