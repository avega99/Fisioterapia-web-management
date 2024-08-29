import { USER_ROLE } from "../../../global/user.types";
import { useAuthStore } from "../../../store/authStore";
import { BodyType, useModalStore } from "../../../store/modalStore";

const TopSideButtons = () => {
    const openModal = useModalStore((state) => state.openModal);
    const user = useAuthStore((state) => state.user);

    const openAddCheckupModal = () => openModal({ bodyType: BodyType.ADD_NEW_PLAYER, title: "Nueva consulta", size: "lg" });
    if (user?.role === USER_ROLE.READ) return;
    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddCheckupModal}>
                Agregar Consulta
            </button>
        </div>
    );
};

export default TopSideButtons;
