import { AxiosInstance } from "axios";
import { IResponse } from "../../global/common.types";
import { ICheckup } from "../../global/checkups.types";

export const getCheckups = (axios: AxiosInstance) => async (): Promise<IResponse<ICheckup[]>> => {
    const response = await axios.get("/checkup");
    console.log(response.data);
    return response.data;
};
