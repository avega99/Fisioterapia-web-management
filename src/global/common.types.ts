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

export interface IPaginatedResponse<T> extends IResponse<T> {
    pagination: {
        totalPages: 1;
        currentPage: 1;
        nextPage: number | null;
        perPage: 10;
    };
}
