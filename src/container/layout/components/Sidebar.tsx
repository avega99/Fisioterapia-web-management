import { Link, NavLink, useLocation } from "react-router-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserGroup from "@heroicons/react/24/outline/UserGroupIcon";
import Shield from "@heroicons/react/24/outline/ShieldCheckIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import gallos from "@/assets/icons/gallos.png";
import { useAuthStore } from "../../../store/authStore";
import { USER_ROLE } from "../../../global/user.types";
import { Fragment, useMemo } from "react";

const Sidebar = () => {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);

    const close = () => {
        document?.getElementById("left-sidebar-drawer")?.click();
    };

    const isAdmin = useMemo(() => user?.role == USER_ROLE.ADMIN || user?.role == USER_ROLE.SUPER_ADMIN, []);
    const isNotPlayer = useMemo(() => user?.role != USER_ROLE.PLAYER, []);

    return (
        <div className="drawer-side  z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
                <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={close}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>
                <li className="mb-2 font-semibold text-xl">
                    <Link to={"/"}>
                        <img className="mask mask-squircle w-10" src={gallos} alt="DashWind Logo" />
                        {user?.name}
                    </Link>{" "}
                </li>
                {isNotPlayer && (
                    <Fragment>
                        <li className="">
                            <NavLink end to={"/"} className={({ isActive }) => `${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`}>
                                <Squares2X2Icon className="h-6 w-6" /> Consultas
                                {location.pathname === "/" ? (
                                    <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary " aria-hidden="true"></span>
                                ) : null}
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink end to={"/jugadores"} className={({ isActive }) => `${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`}>
                                <UserGroup className="h-6 w-6" /> Jugadores
                                {location.pathname === "/jugadores" ? (
                                    <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary " aria-hidden="true"></span>
                                ) : null}
                            </NavLink>
                        </li>
                    </Fragment>
                )}
                {isAdmin && (
                    <li className="">
                        <NavLink end to={"/usuarios"} className={({ isActive }) => `${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`}>
                            <Shield className="h-6 w-6" /> Usuarios (Acceso a la plataforma)
                            {location.pathname === "/usuarios" ? (
                                <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary " aria-hidden="true"></span>
                            ) : null}
                        </NavLink>
                    </li>
                )}
                <li className="">
                    <NavLink end to={"/perfil"} className={({ isActive }) => `${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`}>
                        <UserIcon className="h-6 w-6" /> Perfil
                        {location.pathname === "/perfil" ? (
                            <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary " aria-hidden="true"></span>
                        ) : null}
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
