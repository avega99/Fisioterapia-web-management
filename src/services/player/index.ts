import { IPaginatedResponse, IRequest, IResponse } from "../../global/common.types";
import { IEditPlayerForm, IPlayer, IPlayerForm } from "../../global/player.types";

export const searchPlayersService = async ({ axios, params: { name } }: IRequest<{ name: string }>): Promise<IResponse<IPlayer[]>> => {
    const response = await axios.get(`/player/search?name=${name}`);
    return response.data;
};

export const getPlayerService = async ({ axios, params: { id } }: IRequest<{ id: string | number }>): Promise<IResponse<IPlayer>> => {
    const response = await axios.get(`/player/${id}`);
    return response.data;
};

export const getPlayersService = async ({ axios, params: { page } }: IRequest<{ page: string | number }>): Promise<IPaginatedResponse<IPlayer[]>> => {
    const response = await axios.get(`/player?page=${page}&perPage=6`);
    return response.data;
};

export const deletePlayersService = async ({ axios, params: { id } }: IRequest<{ id: number | string }>): Promise<IResponse<void>> => {
    const response = await axios.delete(`/player/${id}`);
    return response.data;
};

export const createPlayersService = async ({ axios, params }: IRequest<IPlayerForm>): Promise<IResponse<IPlayer>> => {
    const formData = new FormData();
    const file = params.avatar?.item(0);
    if (file) {
        formData.append("avatar", file);
    }
    formData.append("player_name", params.player_name);
    formData.append("category", params.category);
    formData.append("last_name", params.last_name);
    formData.append("squad_number", params.squad_number.toString());
    formData.append("status", params.status);

    const response = await axios.post(`/player`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updatePlayersService = async ({ axios, params }: IRequest<IEditPlayerForm>): Promise<IResponse<IPlayer>> => {
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

    formData.append("player_name", params.player_name);
    formData.append("category", params.category);
    formData.append("last_name", params.last_name);
    formData.append("squad_number", params.squad_number.toString());
    formData.append("status", params.status);

    const response = await axios.patch(`/player/${params.id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
