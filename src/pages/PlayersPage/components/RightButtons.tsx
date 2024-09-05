import { BodyType, useModalStore } from "@/store/modalStore";
import { useCallback } from "react";

const RightButtons = () => {
    const openModal = useModalStore((state) => state.openModal);

    const openAddModal = useCallback(() => {
        openModal({ bodyType: BodyType.ADD_PLAYER, title: "Agregar Jugador", size: "lg" });
    }, []);

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddModal}>
                Agregar jugador
            </button>
        </div>
    );
};

export default RightButtons;
