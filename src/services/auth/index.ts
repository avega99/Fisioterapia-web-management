import { axiosBase } from "../../config/api";
import { ILoggedUser, ILogin, RefreshToken } from "../../global/auth.types";
import { IResponse } from "../../global/common.types";

export const loginService = async (data: ILogin): Promise<IResponse<ILoggedUser>> => {
    const response = await axiosBase.post("/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    return response.data;
};

export const refreshService = async (): Promise<IResponse<ILoggedUser>> => {
    const response = await axiosBase.get("/auth/refresh", {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    console.log(response.data);

    return response.data;
};
