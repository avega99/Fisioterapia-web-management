import React, { useEffect } from "react";
import { useHeaderStore } from "../../store/headerStore";

const PlayersPage = () => {
    const setTitle = useHeaderStore((state) => state.setTitle);

    useEffect(() => {
        setTitle("Jugadores");
    }, []);
    return (
        <div>
            <h1>Players Page</h1>
        </div>
    );
};

export default PlayersPage;
