import TitleCard from "@/common/cards/TitleCard";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import ErrorMessage from "@/common/texts/ErrorMessage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getPlayerService } from "@/services/player";
import { useQuery } from "@tanstack/react-query";
import UserImage from "@/assets/icons/user.png";
import { PhotoView } from "react-photo-view";
import PlayerStatusBadge from "@/common/badges/PlayerStatusBadge";
import { PLAYER_CATEGORY } from "@/global/player.types";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { getCheckupsService } from "@/services/checkups";
import { useHeaderStore } from "@/store/headerStore";
import { useAuthStore } from "@/store/authStore";
import EmptyTableText from "@/common/texts/EmptyTableText";
import { ICheckup } from "@/global/checkups.types";
import { BodyType, useModalStore } from "@/store/modalStore";
import CheckupRow from "../PlayerDetailsPage/components/CheckupRow";

const Playe = () => {
    const [page, setPage] = useState(1);
    const user = useAuthStore((state) => state.user);
    const openModal = useModalStore((state) => state.openModal);
    const getPlayer = useAxiosPrivate(getPlayerService);
    const setTitle = useHeaderStore((state) => state.setTitle);
    const getCheckups = useAxiosPrivate(getCheckupsService);

    if (!user) return null;

    const playerQuery = useQuery({
        queryKey: ["player", user?.playerId],
        queryFn: () => getPlayer({ id: user?.playerId as number }),
    });

    const checkupsQuery = useQuery({
        queryKey: ["playerCheckups", user?.id],
        queryFn: () => getCheckups({ page, playerId: user?.playerId }),
    });

    const category = useMemo(() => {
        return playerQuery.data?.data.category == PLAYER_CATEGORY.SUB_19 ? "Sub 19" : "Sub 23";
    }, [playerQuery.data?.data.category]);

    const nextPage = useCallback(
        () =>
            setPage((prev) => {
                return prev + 1;
            }),
        []
    );
    const prevPage = useCallback(() => setPage((prev) => prev - 1), []);

    const onDeleteCheckup = useCallback(
        (checkup: ICheckup) => {
            openModal({
                bodyType: BodyType.DELETE_CHECKUP,
                title: "Confirmación",
                extraData: { type: "DeleteCheckup", data: checkup, queryKey: ["playerCheckups", user?.playerId as number] },
            });
        },
        [user?.playerId]
    );

    useEffect(() => {
        setTitle("Jugador");
    }, []);

    if (playerQuery.isPending || checkupsQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (playerQuery.isError || checkupsQuery.isError) {
        return <ErrorMessage />;
    }

    return (
        <Fragment>
            {playerQuery.isSuccess && (
                <TitleCard title={`Mis consultas`} showBack={false}>
                    <div className="hero bg-base-200">
                        <div className="hero-content flex-col lg:flex-row">
                            <PhotoView src={playerQuery.data.data.avatar ? playerQuery.data.data.avatar : UserImage}>
                                <img
                                    src={playerQuery.data.data.avatar ? playerQuery.data.data.avatar : UserImage}
                                    className="avatar rounded-full w-full aspect-[1] max-w-sm  shadow-2xl"
                                />
                            </PhotoView>
                            <div className="grid gap-5">
                                <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">{`${playerQuery.data.data.player_name} ${playerQuery.data.data.last_name}`}</h1>
                                <div className="flex gap-5">
                                    <span className="font-semibold">Condición:</span>
                                    <div className="text-center lg:text-left">
                                        <PlayerStatusBadge status={playerQuery.data.data.player_status} />
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <span className="font-semibold">Categoría:</span>
                                    <p className="text-center lg:text-left">{category}</p>
                                </div>
                                <div className="flex gap-5">
                                    <span className="font-semibold">No. Playera:</span>
                                    <p className="text-center lg:text-left">{playerQuery.data.data.squad_number}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full ">
                            <thead>
                                <tr>
                                    <th>Atendido por</th>
                                    <th>Fecha de Atención</th>
                                    <th className="tracking-wider ">Tratamiento</th>
                                    <th className="tracking-wider">Tests</th>
                                    <th className="tracking-wider">Resultados</th>
                                    <th className=""></th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkupsQuery.data.data.map((checkup) => (
                                    <CheckupRow key={checkup.id} checkup={checkup} user={user} onDeleteCheckup={onDeleteCheckup} />
                                ))}
                                {checkupsQuery.data.data.length == 0 && <EmptyTableText title="No hay consultas para mostrar" colSpan={6} />}
                                {checkupsQuery.isError && (
                                    <tr>
                                        <td colSpan={10}>
                                            <ErrorMessage />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-8">
                        <div className="join">
                            <button onClick={prevPage} disabled={page <= 1} className="join-item btn">
                                «
                            </button>
                            <button className="join-item btn">Página {page}</button>
                            <button onClick={nextPage} disabled={!checkupsQuery.data?.pagination.nextPage} className="join-item btn">
                                »
                            </button>
                        </div>
                    </div>
                </TitleCard>
            )}
        </Fragment>
    );
};

export default Playe;
