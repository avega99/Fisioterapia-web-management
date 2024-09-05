import { useCallback, useEffect, useMemo, useState } from "react";
import { useHeaderStore } from "../../store/headerStore";
import TitleCard from "@/common/cards/TitleCard";
import RightButtons from "./components/RightButtons";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getPlayersService } from "@/services/player";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { USER_ROLE } from "@/global/user.types";
import PlayerRow from "./components/PlayerRow";

const PlayersPage = () => {
    const [page, setPage] = useState(1);
    const setTitle = useHeaderStore((state) => state.setTitle);

    const user = useAuthStore((state) => state.user);
    const getPlayers = useAxiosPrivate(getPlayersService);
    const hasWritePermissions = useMemo(() => user?.role != USER_ROLE.READ, []);

    const playersQuery = useQuery({
        queryKey: ["players", page],
        queryFn: () => getPlayers({ page }),
    });

    const nextPage = useCallback(
        () =>
            setPage((prev) => {
                return prev + 1;
            }),
        []
    );
    const prevPage = useCallback(() => setPage((prev) => prev - 1), []);

    useEffect(() => {
        setTitle("Jugadores");
    }, []);

    return (
        <div>
            <TitleCard title="Lista de jugadores" TopSideButtons={<RightButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Número camiseta</th>
                                <th>Estatus</th>
                                <th>Categoría</th>
                                <th>Fecha de creación</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersQuery.isSuccess &&
                                playersQuery.data.data.map((player) => <PlayerRow key={player.id} hasWritePermissions={hasWritePermissions} player={player} />)}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-8">
                        <div className="join">
                            <button onClick={prevPage} disabled={page <= 1} className="join-item btn">
                                «
                            </button>
                            <button className="join-item btn">Página {page}</button>
                            <button onClick={nextPage} disabled={!playersQuery.data?.pagination.nextPage} className="join-item btn">
                                »
                            </button>
                        </div>
                    </div>
                </div>
            </TitleCard>
        </div>
    );
};

export default PlayersPage;
