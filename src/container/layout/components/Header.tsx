import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { themeChange } from "theme-change";
import { useHeaderStore } from "../../../store/headerStore";
import useLogout from "../../../hooks/useLogout";
import doctor from "@/assets/icons/doctor.png";
import { useAuthStore } from "@/store/authStore";
import { USER_ROLE } from "@/global/user.types";

const Header = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));
    const title = useHeaderStore((state) => state.title);
    const user = useAuthStore((state) => state.user);
    const logout = useLogout();

    useEffect(() => {
        themeChange(false);
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setCurrentTheme("dark");
            } else {
                setCurrentTheme("light");
            }
        }
    }, []);
    return (
        <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
            {/* Menu toogle for mobile view or small screen */}
            <div className="flex-1">
                <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5" />
                </label>
                <h1 className="text-2xl font-semibold ml-2">{title}</h1>
            </div>

            <div className="flex-none ">
                {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
also includes corporate and retro themes in tailwind.config file */}

                {/* <select className="select select-sm mr-4" data-choose-theme>
    <option disabled selected>Theme</option>
    <option value="light">Default</option>
    <option value="dark">Dark</option>
    <option value="corporate">Corporate</option>
    <option value="retro">Retro</option>
</select> */}

                {/* Light and dark theme selection toogle **/}
                <label className="swap ">
                    <input type="checkbox" />
                    <SunIcon
                        data-set-theme="light"
                        data-act-class="ACTIVECLASS"
                        className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")}
                    />
                    <MoonIcon
                        data-set-theme="dark"
                        data-act-class="ACTIVECLASS"
                        className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")}
                    />
                </label>

                {/* Notification icon */}
                {/* <button className="btn btn-ghost ml-4  btn-circle" onClick={() => {}}>
                    <div className="indicator">
                        <BellIcon className="h-6 w-6" />
                        {3 > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{3}</span> : null}
                    </div>
                </button> */}

                {/* Profile icon, opening menu on click */}
                <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.avatar ? user.avatar : doctor} alt="profile" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="justify-between">
                            <Link to={"/app/settings-profile"}>
                                Perfil
                                {/* <span className="badge">New</span> */}
                            </Link>
                        </li>
                        {[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN].includes(user?.role as USER_ROLE) && (
                            <li className="">
                                <Link to={"/app/settings-billing"}>Usuarios</Link>
                            </li>
                        )}
                        <div className="divider mt-0 mb-0"></div>
                        <li>
                            <a onClick={logout}>Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
