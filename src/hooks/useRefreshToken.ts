import { useLocation, useNavigate } from "react-router-dom";
import { refreshService } from "../services/auth";
import { useAuthStore } from "../store/authStore";

const useRefreshToken = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const location = useLocation();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await refreshService();
            setUser(response.data);
            return response.data.accessToken;
        } catch (error) {
            // WE NEED TO LOG OUT
            return navigate("/login", { state: { from: location }, replace: true });
        }
    };

    return refresh;
};

export default useRefreshToken;
