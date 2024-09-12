import { useCallback, useEffect, useState } from "react";
import { useHeaderStore } from "../../store/headerStore";
import TitleCard from "@/common/cards/TitleCard";
import RigthButtons from "./components/RigthButtons";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getUsersService } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import ErrorMessage from "@/common/texts/ErrorMessage";
import EmptyTableText from "@/common/texts/EmptyTableText";
import UserRow from "./components/UserRow";
import { BodyType, useModalStore } from "@/store/modalStore";
import { IUser } from "@/global/user.types";

const UsersPage = () => {
    const [page, setPage] = useState(1);
    const openModal = useModalStore((state) => state.openModal);
    const setTitle = useHeaderStore((state) => state.setTitle);

    const getUsers = useAxiosPrivate(getUsersService);

    const usersQuery = useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(),
        staleTime: 0,
    });

    const nextPage = useCallback(
        () =>
            setPage((prev) => {
                return prev + 1;
            }),
        []
    );
    const prevPage = useCallback(() => setPage((prev) => prev - 1), []);

    const openAddUserModal = useCallback(() => {
        openModal({
            bodyType: BodyType.ADD_USER,
            title: "Agregar Usuario",
            size: "lg",
            extraData: { type: "addUser", queryKey: ["users", page] },
        });
    }, [page]);

    const openEditUserModal = useCallback(
        (user: IUser) => {
            openModal({
                bodyType: BodyType.EDIT_USER,
                title: "Editar Usuario",
                size: "lg",
                extraData: { type: "updateUser", data: user, queryKey: ["users", page] },
            });
        },
        [page]
    );

    const openDeleteUserModal = useCallback(
        (user: IUser) => {
            openModal({
                bodyType: BodyType.DELETE_USER,
                title: "Confirmación",
                size: "lg",
                extraData: { type: "deleteUser", data: user, queryKey: ["users", page] },
            });
        },
        [page]
    );

    useEffect(() => {
        setTitle("Usuarios");
    }, []);

    if (usersQuery.isPending) {
        return <LoadingIndicator />;
    }

    return (
        usersQuery.isSuccess && (
            <TitleCard title="Usuarios registrados" TopSideButtons={<RigthButtons openAddUserModal={openAddUserModal} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Role</th>
                                <th>Estatus</th>
                                <th>Fecha de creación</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersQuery.isSuccess &&
                                usersQuery.data.data.map((user) => (
                                    <UserRow openDeleteUserModal={openDeleteUserModal} openEditUserModal={openEditUserModal} key={user.id} user={user} />
                                ))}
                            {usersQuery.isError && (
                                <tr>
                                    <td colSpan={6}>
                                        {" "}
                                        <ErrorMessage />
                                    </td>
                                </tr>
                            )}
                            {usersQuery.data?.data.length == 0 && <EmptyTableText colSpan={6} title="No hay jugadores para mostrar" />}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-8">
                    <div className="join">
                        <button onClick={prevPage} disabled={page <= 1} className="join-item btn">
                            «
                        </button>
                        <button className="join-item btn">Página {page}</button>
                        <button onClick={nextPage} disabled={!usersQuery.data?.pagination.nextPage} className="join-item btn">
                            »
                        </button>
                    </div>
                </div>
            </TitleCard>
        )
    );
};

export default UsersPage;
