import { useAuthStore } from "../store/authStore";
import { logoutService } from "../services/auth";

const useLogout = () => {
    const { setUser } = useAuthStore((state) => state);

    const logout = async () => {
        try {
            // const response = await logoutService();
            await logoutService();
            setUser(null);
        } catch (error) {
            console.error({ error });
        }
    };
    return logout;
};

export default useLogout;
