import { ICheckupMedia } from "@/global/checkupMedia.interfaces";
import { IRequest, IResponse } from "@/global/common.types";

export const getCheckupAssetsService = async ({ axios, params: { id } }: IRequest<{ id: number | string }>): Promise<IResponse<ICheckupMedia[]>> => {
    const response = await axios.get(`/media/${id}`);

    return response.data;
};
