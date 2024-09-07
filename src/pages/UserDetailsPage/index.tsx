import TitleCard from "@/common/cards/TitleCard";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import ErrorMessage from "@/common/texts/ErrorMessage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getUserService } from "@/services/user";
import { useHeaderStore } from "@/store/headerStore";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { PhotoView } from "react-photo-view";
import { useParams } from "react-router-dom";
import doctor from "@/assets/icons/doctor.png";
import UserStatusBadge from "@/common/badges/UserStatusBadge";
import RoleStatusBadge from "@/common/badges/RoleStatusBadge";
import { getCheckupsService } from "@/services/checkups";
import EmptyTableText from "@/common/texts/EmptyTableText";
import CheckupRow from "./components/CheckupRow";
import { useAuthStore } from "@/store/authStore";

const UserDetailsPage = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const setTitle = useHeaderStore((state) => state.setTitle);
    const user = useAuthStore((state) => state.user);
    const getUser = useAxiosPrivate(getUserService);
    const getCheckups = useAxiosPrivate(getCheckupsService);

    const userQuery = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUser({ id: id as string }),
    });

    const checkupsQuery = useQuery({
        queryKey: ["userCheckups", id],
        queryFn: () => getCheckups({ page, createdById: id }),
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
        setTitle("Detalles de usuario");
    }, []);

    if (userQuery.isLoading || checkupsQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (userQuery.isError || checkupsQuery.isError) {
        return <ErrorMessage />;
    }

    return (
        userQuery.isSuccess && (
            <TitleCard title={`Consultas realizadas por ${userQuery.data.data.name} ${userQuery.data.data.last_name}`} showBack>
                <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <PhotoView src={userQuery.data.data.avatar ? userQuery.data.data.avatar : doctor}>
                            <img
                                src={userQuery.data.data.avatar ? userQuery.data.data.avatar : doctor}
                                className="avatar rounded-full w-full aspect-[1] max-w-sm  shadow-2xl"
                            />
                        </PhotoView>
                        <div className="grid gap-5">
                            <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">{`${userQuery.data.data.name} ${userQuery.data.data.last_name}`}</h1>
                            <div className="flex gap-5">
                                <span className="font-semibold">Estatus:</span>
                                <div className="text-center lg:text-left">
                                    <UserStatusBadge status={userQuery.data.data.status} />
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <span className="font-semibold">Rol:</span>
                                <RoleStatusBadge role={userQuery.data.data.role} />
                            </div>
                            <div className="flex gap-5">
                                <span className="font-semibold">Correo:</span>
                                <p className="text-center lg:text-left">{userQuery.data.data.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full ">
                        <thead>
                            <tr>
                                <th>Jugador</th>
                                <th>Fecha de Atención</th>
                                <th className="tracking-wider ">Tratamiento</th>
                                <th className="tracking-wider">Tests</th>
                                <th className="tracking-wider">Resultados</th>
                                <th className=""></th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkupsQuery.data.data.map((checkup) => (
                                <CheckupRow key={checkup.id} checkup={checkup} user={user} onDeleteCheckup={() => {}} />
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
        )
    );
};

export default UserDetailsPage;
