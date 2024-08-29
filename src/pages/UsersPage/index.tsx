import { useEffect } from "react";
import { useHeaderStore } from "../../store/headerStore";

const UsersPage = () => {
    const setTitle = useHeaderStore((state) => state.setTitle);

    useEffect(() => {
        setTitle("Usuarios");
    }, []);
    return (
        <div>
            <h1>User Page</h1>
        </div>
    );
};

export default UsersPage;
