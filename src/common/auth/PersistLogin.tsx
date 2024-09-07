import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import useRefreshToken from "../../hooks/useRefreshToken";
import LoadingIndicator from "../loading/LoadingIndicator";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useAuthStore((state) => state.user);
    const persist = useAuthStore((state) => state.persists);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    // useEffect(() => {
    //     console.log(`isLoading ${isLoading}`);
    //     console.log(`aT ${JSON.stringify(user?.accessToken)}`);
    // }, [isLoading]);

    return <>{!persist ? <Outlet /> : isLoading ? <LoadingIndicator /> : <Outlet />}</>;
};

export default PersistLogin;
