import { USER_ROLE } from "@/global/user.types";

interface Props {
    role: USER_ROLE;
}

const RoleStatusBadge = ({ role }: Props) => {
    if (role == USER_ROLE.ADMIN)
        return (
            <div className=" whitespace-nowrap inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                Administrador
            </div>
        );
    if (role == USER_ROLE.SUPER_ADMIN)
        return (
            <div className=" whitespace-nowrap inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                Super Administrador
            </div>
        );
    if (role == USER_ROLE.WRITE)
        return <div className=" whitespace-nowrap inline-flex rounded-full bg-sky-500 text-sky-500 bg-opacity-10 px-3 py-1 text-sm font-medium">Escritura</div>;
    if (role == USER_ROLE.READ)
        return (
            <div className=" whitespace-nowrap inline-flex rounded-full bg-indigo-500 text-indigo-500 bg-opacity-10  px-3 py-1 text-sm font-medium">
                Lectura
            </div>
        );
    return <div></div>;
};

export default RoleStatusBadge;
