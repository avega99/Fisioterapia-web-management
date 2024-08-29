export type ResponseStatus = "success" | "error" | "fail";

export interface IResponse<T> {
    status: ResponseStatus;
    message: string;
    data: T;
}
