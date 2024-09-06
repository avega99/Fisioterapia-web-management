import { Fragment, useCallback, useEffect, useState } from "react";
import TopSideButtons from "./components/TopSideButtons";
import { useHeaderStore } from "../../store/headerStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getCheckupsService } from "../../services/checkups";
import CheckupRow from "./components/CheckupRow";
import { useQuery } from "@tanstack/react-query";
import TitleCard from "@/common/cards/TitleCard";
import { ICheckup } from "@/global/checkups.types";
import { BodyType, useModalStore } from "@/store/modalStore";
import { useAuthStore } from "@/store/authStore";
import EmptyTableText from "@/common/texts/EmptyTableText";
import ErrorMessage from "@/common/texts/ErrorMessage";
import LoadingIndicator from "@/common/loading/LoadingIndicator";

const HomePage = () => {
    const [page, setPage] = useState(1);
    const setTitle = useHeaderStore((state) => state.setTitle);
    const user = useAuthStore((state) => state.user);
    const openModal = useModalStore((state) => state.openModal);
    const getCheckups = useAxiosPrivate(getCheckupsService);

    const checkuQuery = useQuery({
        queryKey: ["checkups", page],
        queryFn: () => getCheckups({ page }),
    });

    const onDeleteCheckup = useCallback(
        (checkup: ICheckup) => {
            openModal({
                bodyType: BodyType.DELETE_CHECKUP,
                title: "Confirmación",
                extraData: { data: checkup, type: "DeleteCheckup", queryKey: ["checkups", page] },
            });
        },
        [page]
    );

    const nextPage = useCallback(
        () =>
            setPage((prev) => {
                return prev + 1;
            }),
        []
    );
    const prevPage = useCallback(() => setPage((prev) => prev - 1), []);

    useEffect(() => {
        setTitle("Home");
    }, []);

    if (!user) return null;

    if (checkuQuery.isPending) {
        return <LoadingIndicator />;
    }

    return (
        <div>
            <TitleCard title="Consultas" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full ">
                        <thead>
                            <tr>
                                <th>Nombre Jugador</th>
                                <th># de playera</th>
                                <th>Fecha de Atención</th>
                                <th>Condicion </th>
                                <th>Atendido por</th>
                                <th className="tracking-wider ">Tratamiento</th>
                                <th className="tracking-wider">Tests</th>
                                <th className="tracking-wider">Resultados</th>
                                <th className=""></th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkuQuery.isSuccess ? (
                                <Fragment>
                                    {checkuQuery.data.data.map((checkup) => (
                                        <CheckupRow user={user} key={checkup.id} checkup={checkup} onDeleteCheckup={onDeleteCheckup} />
                                    ))}
                                    {checkuQuery.data.data.length == 0 && <EmptyTableText colSpan={10} title="No hay consultas para mostrar" />}
                                </Fragment>
                            ) : null}
                            {checkuQuery.isError && (
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
                        <button onClick={nextPage} disabled={!checkuQuery.data?.pagination.nextPage} className="join-item btn">
                            »
                        </button>
                    </div>
                </div>
            </TitleCard>
        </div>
    );
};

export default HomePage;
