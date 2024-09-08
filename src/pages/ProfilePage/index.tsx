import TitleCard from "@/common/cards/TitleCard";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import ErrorMessage from "@/common/texts/ErrorMessage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getUserService } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { PhotoView } from "react-photo-view";
import doctor from "@/assets/icons/doctor.png";
import UserStatusBadge from "@/common/badges/UserStatusBadge";
import RoleStatusBadge from "@/common/badges/RoleStatusBadge";
import { getCheckupsService } from "@/services/checkups";
import { useCallback, useEffect, useState } from "react";
import CheckupRow from "./components/CheckupRow";
import EmptyTableText from "@/common/texts/EmptyTableText";
import { useAuthStore } from "@/store/authStore";
import Subtitle from "@/common/texts/Subtitle";
import { BodyType, useModalStore } from "@/store/modalStore";
import { useHeaderStore } from "@/store/headerStore";
import { ICheckup } from "@/global/checkups.types";

const ProfilePage = () => {
    const [page, setPage] = useState(1);
    const user = useAuthStore((state) => state.user);
    const openModal = useModalStore((state) => state.openModal);
    const getMe = useAxiosPrivate(getUserService);
    const getCheckups = useAxiosPrivate(getCheckupsService);
    const setTitle = useHeaderStore((state) => state.setTitle);

    const meQuery = useQuery({
        queryKey: ["myProfile"],
        queryFn: () => getMe({ id: user?.id as number }),
    });

    const checkupsQuery = useQuery({
        queryKey: ["myCheckups"],
        queryFn: () => getCheckups({ page, createdById: meQuery.data?.data.id }),
        enabled: !!meQuery.data?.data.id,
    });

    const nextPage = useCallback(
        () =>
            setPage((prev) => {
                return prev + 1;
            }),
        []
    );
    const prevPage = useCallback(() => setPage((prev) => prev - 1), []);

    const openEditModal = useCallback(() => {
        openModal({ bodyType: BodyType.EDIT_ME, title: "Editar mi perfil" });
    }, []);

    const onDeleteCheckup = useCallback(
        (checkup: ICheckup) => {
            openModal({
                bodyType: BodyType.DELETE_CHECKUP,
                title: "Confirmación",
                extraData: { data: checkup, type: "DeleteCheckup", queryKey: ["myCheckups"] },
            });
        },
        [page]
    );

    useEffect(() => {
        setTitle("Mi perfil");
    }, []);

    if (meQuery.isPending || checkupsQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (meQuery.isPending || checkupsQuery.isError) {
        return <ErrorMessage />;
    }

    return (
        meQuery.isSuccess && (
            <TitleCard title={`Mi perfil`} showBack>
                <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <PhotoView src={meQuery.data.data.avatar ? meQuery.data.data.avatar : doctor}>
                            <img
                                src={meQuery.data.data.avatar ? meQuery.data.data.avatar : doctor}
                                className="avatar rounded-full w-full aspect-[1] max-w-sm  shadow-2xl"
                            />
                        </PhotoView>
                        <div className="grid gap-5">
                            <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">{`${meQuery.data.data.name} ${meQuery.data.data.last_name}`}</h1>
                            <div className="flex gap-5">
                                <span className="font-semibold">Estatus:</span>
                                <div className="text-center lg:text-left">
                                    <UserStatusBadge status={meQuery.data.data.status} />
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <span className="font-semibold">Rol:</span>
                                <RoleStatusBadge role={meQuery.data.data.role} />
                            </div>
                            <div className="flex gap-5">
                                <span className="font-semibold">Correo:</span>
                                <p className="text-center lg:text-left">{meQuery.data.data.email}</p>
                            </div>
                            <div>
                                <button onClick={openEditModal} className="btn btn-primary">
                                    Editar mi perfil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <Subtitle className="my-4 ml-5">Consultas realizadas por mí</Subtitle>
                <div className="overflow-x-auto- w-full">
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
        )
    );
};

export default ProfilePage;
