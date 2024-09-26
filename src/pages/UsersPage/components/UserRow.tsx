import { IUser } from "@/global/user.types";
import doctor from "@/assets/icons/doctor.png";
import dayjs from "dayjs";
import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { DocumentMagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import UserStatusBadge from "@/common/badges/UserStatusBadge";
import RoleStatusBadge from "@/common/badges/RoleStatusBadge";

interface Props {
    user: IUser;
    openEditUserModal: (user: IUser) => void;
    openDeleteUserModal: (user: IUser) => void;
}

const UserRow = ({ user, openEditUserModal, openDeleteUserModal }: Props) => {
    const formattedDate = useMemo(() => dayjs(user.createdAt).format("DD MMM YY"), [user.createdAt]);
    const newAvatar = useMemo(() => (user.avatar != "" && user.avatar != null && user.avatar != "undefined" ? user.avatar : doctor), [user.avatar]);

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={newAvatar} alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.last_name}</div>
                    </div>
                </div>
            </td>
            <td>{user.email}</td>
            <td>
                <RoleStatusBadge role={user.role} />
            </td>
            <td>
                <UserStatusBadge status={user.status} />
            </td>
            <td>{formattedDate}</td>
            <td className="min-w-44">
                {!user.playerId && (
                    <Fragment>
                        <Link to={`/usuario/${user.id}`}>
                            <div className="tooltip" data-tip="Ver historial de consultas realizadas por este usuario">
                                <button className="btn btn-square btn-ghost">
                                    <DocumentMagnifyingGlassIcon className="w-5" />
                                </button>
                            </div>
                        </Link>

                        <div className="tooltip" data-tip="Editar usuario">
                            <button className="btn btn-square btn-ghost" onClick={() => openEditUserModal(user)}>
                                <PencilSquareIcon className="w-5" />
                            </button>
                        </div>
                    </Fragment>
                )}
                <div className="tooltip" data-tip="Eliminar usuario">
                    <button className="btn btn-square btn-ghost" onClick={() => openDeleteUserModal(user)}>
                        <TrashIcon className="w-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;
