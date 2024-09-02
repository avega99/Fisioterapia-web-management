import { IRequest, IResponse } from "../../global/common.types";
import { ICheckup, ICheckupDetails, ICheckupForm } from "../../global/checkups.types";

export const getCheckupsService = async ({ axios }: IRequest<void>): Promise<IResponse<ICheckup[]>> => {
    const response = await axios.get("/checkup");
    console.log(response.data);
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

export const getCheckupDetailsService = async ({ axios, params }: IRequest<{ id: number | string }>): Promise<IResponse<ICheckupDetails>> => {
    const response = await axios.get(`/checkup/${params.id}`);
    return response.data;
};
