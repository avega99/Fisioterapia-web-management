import { USER_ROLE } from "../global/user.types";
import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface Props {
    allowedRoles: USER_ROLE[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    return allowedRoles.includes(user?.role as USER_ROLE) ? (
        <Outlet />
    ) : user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
    );
};

export default RequireAuth;
