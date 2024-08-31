import { IRequest, IResponse } from "../../global/common.types";
import { ICheckup } from "../../global/checkups.types";

export const getCheckupsService = async ({ axios }: IRequest<void>): Promise<IResponse<ICheckup[]>> => {
    const response = await axios.get("/checkup");
    console.log(response.data);
    return response.data;
};
