import { IPaginatedResponse, IRequest, IResponse } from "@/global/common.types";
import { IAddUserForm, IEditUserForm, IUser } from "@/global/user.types";

export const getUsersService = async ({ axios }: IRequest<void>): Promise<IPaginatedResponse<IUser[]>> => {
    const response = await axios.get(`/user`);
    return response.data;
};

export const deleteUserService = async ({ axios, params: { id } }: IRequest<{ id: number | string }>): Promise<IResponse<IUser>> => {
    const response = await axios.delete(`/user/${id}`);
    return response.data;
};

export const getUserService = async ({ axios, params: { id } }: IRequest<{ id: number | string }>): Promise<IResponse<IUser>> => {
    const response = await axios.get(`/user/${id}`);
    return response.data;
};

export const createUserService = async ({ axios, params }: IRequest<IAddUserForm>): Promise<IPaginatedResponse<IUser[]>> => {
    const formData = new FormData();

    if (params.avatar) {
        formData.append("avatar", params.avatar[0]);
    }
    formData.append("name", params.name);
    formData.append("last_name", params.last_name);
    formData.append("email", params.email);
    formData.append("password", params.password);
    formData.append("status", params.status);
    formData.append("role", params.role);

    const response = await axios.post(`/user`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const editUserService = async ({ axios, params }: IRequest<IEditUserForm>): Promise<IPaginatedResponse<IUser[]>> => {
    const formData = new FormData();

    if (typeof params.avatar == "string") {
        formData.append("avatar", params.avatar);
    }

    if (params.avatar && typeof params.avatar == "object") {
        const file = params.avatar?.item(0);
        if (file) {
            formData.append("avatar", file);
        }
    }
    formData.append("name", params.name);
    formData.append("last_name", params.last_name);
    formData.append("email", params.email);
    formData.append("status", params.status);
    formData.append("role", params.role);

    const response = await axios.patch(`/user/${params.id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
