import { IPaginatedResponse, IRequest, IResponse } from "../../global/common.types";
import { ICheckup, ICheckupDetails, ICheckupForm, IEditCheckupForm } from "../../global/checkups.types";

export const getCheckupsService = async ({
    axios,
    params: { page, playerId },
}: IRequest<{ page: number; playerId?: number | string }>): Promise<IPaginatedResponse<ICheckup[]>> => {
    const url = playerId ? `/checkup?page=${page}&perPage=6&playerId=${playerId}` : `/checkup?page=${page}&perPage=6`;
    const response = await axios.get(url);
    return response.data;
};

export const createCheckupsService = async ({ axios, params }: IRequest<ICheckupForm>): Promise<IResponse<ICheckup[]>> => {
    const formData = new FormData();

    for (let i = 0; i < params.assets.length; i++) {
        const file = params.assets[i];
        formData.append("assets", file);
    }

    formData.append("notes", params.notes);
    formData.append("playerId", params.player.id.toString());
    formData.append("tests", params.tests);
    formData.append("results", params.results);

    const response = await axios.post("/checkup", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const upadateheckupService = async ({
    axios,
    params: { data, id },
}: IRequest<{ data: IEditCheckupForm; id: number | string }>): Promise<IResponse<ICheckup>> => {
    const formData = new FormData();

    formData.append("notes", data.notes);
    formData.append("playerId", data.player.id.toString());
    formData.append("tests", data.tests);
    formData.append("results", data.results);

    const response = await axios.patch(`/checkup/${id}`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const getCheckupDetailsService = async ({ axios, params }: IRequest<{ id: number | string }>): Promise<IResponse<ICheckupDetails>> => {
    const response = await axios.get(`/checkup/${params.id}`);
    return response.data;
};

export const deleteCheckupService = async ({ axios, params: { id } }: IRequest<{ id: number | string }>): Promise<IResponse<void>> => {
    const response = await axios.delete(`/checkup/${id}`);
    return response.data;
};
