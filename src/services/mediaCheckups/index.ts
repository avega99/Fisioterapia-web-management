import { ICheckupMedia, IMediaForm } from "@/global/checkupMedia.interfaces";
import { IRequest, IResponse } from "@/global/common.types";

export const getCheckupAssetsService = async ({ axios, params: { id } }: IRequest<{ id: number | string }>): Promise<IResponse<ICheckupMedia[]>> => {
    const response = await axios.get(`/media/${id}`);

    return response.data;
};

export const deleteAssetService = async ({ axios, params: { id } }: IRequest<{ id: number | string }>): Promise<IResponse<void>> => {
    const response = await axios.delete(`/media/${id}`);

    return response.data;
};

export const uploadAssetsService = async ({ axios, params: { checkupId, files } }: IRequest<IMediaForm>): Promise<IResponse<void>> => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            formData.append("assets", file);
        }
    }
    formData.append("checkupId", checkupId.toString());

    const response = await axios.post(`/media`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
