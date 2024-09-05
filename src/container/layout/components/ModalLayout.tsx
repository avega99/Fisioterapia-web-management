import DeleteConfirmationModal from "@/pages/HomePage/components/DeleteConfirmationModal";
import AddNewCheckup from "../../../pages/HomePage/components/AddNewCheckup";
import { BodyType, useModalStore } from "../../../store/modalStore";
import DeleteAssetModal from "@/pages/EditCheckupAssetsPage/components/DeleteAssetModal";

const ModalLayout = () => {
    const { bodyType, isOpen, size, title, closeModal } = useModalStore((state) => state);
    return (
        <div>
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                    <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>
                    {
                        {
                            [BodyType.ADD_NEW_PLAYER]: <AddNewCheckup closeModal={closeModal} />,
                            [BodyType.DELETE_CHECKUP]: <DeleteConfirmationModal closeModal={closeModal} />,
                            [BodyType.DELETE_ASSET]: <DeleteAssetModal closeModal={closeModal} />,
                            [BodyType.DEFAULT]: <div></div>,
                        }[bodyType]
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalLayout;
