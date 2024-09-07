import DeleteConfirmationModal from "@/pages/HomePage/components/DeleteConfirmationModal";
import AddNewCheckup from "../../../pages/HomePage/components/AddNewCheckup";
import { BodyType, useModalStore } from "../../../store/modalStore";
import DeleteAssetModal from "@/pages/EditCheckupAssetsPage/components/DeleteAssetModal";
import AddPlayer from "@/pages/PlayersPage/components/AddPlayer";
import DeletePlayer from "@/pages/PlayersPage/components/DeletePlayer";
import EditPlayer from "@/pages/PlayersPage/components/EditPlayer";
import AddUser from "@/pages/UsersPage/components/AddUser";
import EditUser from "@/pages/UsersPage/components/EditUser";
import DeleteUser from "@/pages/UsersPage/components/DeleteUser";

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
                            [BodyType.ADD_NEW_CHECKUP]: <AddNewCheckup closeModal={closeModal} />,
                            [BodyType.DELETE_CHECKUP]: <DeleteConfirmationModal closeModal={closeModal} />,
                            [BodyType.DELETE_ASSET]: <DeleteAssetModal closeModal={closeModal} />,
                            [BodyType.ADD_PLAYER]: <AddPlayer closeModal={closeModal} />,
                            [BodyType.DELETE_PLAYER]: <DeletePlayer closeModal={closeModal} />,
                            [BodyType.EDIT_PLAYER]: <EditPlayer closeModal={closeModal} />,
                            [BodyType.ADD_USER]: <AddUser closeModal={closeModal} />,
                            [BodyType.EDIT_USER]: <EditUser closeModal={closeModal} />,
                            [BodyType.DELETE_USER]: <DeleteUser closeModal={closeModal} />,
                            [BodyType.DEFAULT]: <div></div>,
                        }[bodyType]
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalLayout;
