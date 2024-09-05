import { IPaginatedResponse, IRequest, IResponse } from "../../global/common.types";
import { IPlayer } from "../../global/player.types";

export const searchPlayersService = async ({ axios, params: { name } }: IRequest<{ name: string }>): Promise<IResponse<IPlayer[]>> => {
    const response = await axios.get(`/player/search?name=${name}`);
    return response.data;
};

export const getPlayersService = async ({ axios, params: { page } }: IRequest<{ page: string | number }>): Promise<IPaginatedResponse<IPlayer[]>> => {
    const response = await axios.get(`/player?page=${page}&perPage=6`);
    return response.data;
};
