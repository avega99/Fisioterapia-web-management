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
import { IPlayer } from "@/global/player.types";
import { BodyType, useModalStore } from "@/store/modalStore";
import ErrorMessage from "@/common/texts/ErrorMessage";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import EmptyTableText from "@/common/texts/EmptyTableText";

const PlayersPage = () => {
    const [page, setPage] = useState(1);
    const setTitle = useHeaderStore((state) => state.setTitle);
    const openModal = useModalStore((state) => state.openModal);

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

    const openDeleteModal = useCallback(
        (player: IPlayer) => openModal({ title: "Confirmación", bodyType: BodyType.DELETE_PLAYER, extraData: { type: "player", data: player, page } }),
        [page]
    );

    const openEditModal = useCallback(
        (player: IPlayer) =>
            openModal({ title: "Confirmación", bodyType: BodyType.EDIT_PLAYER, size: "lg", extraData: { type: "player", data: player, page } }),
        [page]
    );

    useEffect(() => {
        setTitle("Jugadores");
    }, []);

    if (playersQuery.isPending) {
        return <LoadingIndicator />;
    }

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
                                playersQuery.data.data.map((player) => (
                                    <PlayerRow
                                        openDeleteModal={openDeleteModal}
                                        openEditModal={openEditModal}
                                        key={player.id}
                                        hasWritePermissions={hasWritePermissions}
                                        player={player}
                                    />
                                ))}
                            {playersQuery.isError && <td colSpan={6}>{playersQuery.isError && <ErrorMessage />}</td>}
                            {playersQuery.data?.data.length == 0 && <EmptyTableText colSpan={6} title="No hay jugadores para mostrar" />}
                        </tbody>
                    </table>
                </div>
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
            </TitleCard>
        </div>
    );
};

export default PlayersPage;
