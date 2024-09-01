import { useEffect, useCallback } from "react";
import { axiosPrivate } from "../config/api";
import useRefreshToken from "./useRefreshToken";
import { useAuthStore } from "../store/authStore";
import { IRequest } from "../global/common.types";

const useAxiosPrivate = <T, O>(service: (params: IRequest<T>) => Promise<O>) => {
    const user = useAuthStore((state) => state.user);
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error.response?.status === 401) {
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [user, refresh]);

    const makeRequest = useCallback(
        async (data: T): Promise<Awaited<O>> => {
            // const newData = data[0];
            const response = await service({ axios: axiosPrivate, params: data });
            return response;
        },
        [service]
    );

    return makeRequest;
};

export default useAxiosPrivate;
