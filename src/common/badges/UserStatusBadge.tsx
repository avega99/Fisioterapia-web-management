import { USER_STATUS } from "@/global/user.types";

interface Props {
    status: USER_STATUS;
}

const UserStatusBadge = ({ status }: Props) => {
    if (status == USER_STATUS.ACTIVE)
        return <div className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">Activo</div>;
    if (status == USER_STATUS.INACTIVE)
        return <div className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">Inactivo</div>;
    return <div></div>;
};

export default UserStatusBadge;
