import { IRequest, IResponse } from "../../global/common.types";
import { IPlayer } from "../../global/player.types";

export const searchPlayersService = async ({ axios, params: { name } }: IRequest<{ name: string }>): Promise<IResponse<IPlayer[]>> => {
    const response = await axios.get(`/player/search?name=${name}`);
    return response.data;
};
