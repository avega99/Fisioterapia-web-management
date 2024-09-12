import axios from "axios";

const BASE_URL = "https://rios-management-api-development.up.railway.app/api/v1";

export const axiosBase = axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
