import { USER_ROLE } from "@/global/user.types";
import { useAuthStore } from "@/store/authStore";
import { BodyType, useModalStore } from "@/store/modalStore";
import { useCallback } from "react";

const RightButtons = () => {
    const openModal = useModalStore((state) => state.openModal);
    const user = useAuthStore((state) => state.user);

    const openAddModal = useCallback(() => {
        openModal({ bodyType: BodyType.ADD_PLAYER, title: "Agregar Jugador", size: "lg" });
    }, []);

    return (
        <div className="inline-block float-right">
            {user?.role != USER_ROLE.READ && (
                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddModal}>
                    Agregar jugador
                </button>
            )}
        </div>
    );
};

export default RightButtons;
