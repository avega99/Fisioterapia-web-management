import { IResponse } from "@/global/common.types";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { deleteCheckupService } from "@/services/checkups";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Props {
    closeModal: VoidFunction;
}

const DeleteConfirmationModal = ({ closeModal }: Props) => {
    const queryClient = useQueryClient();
    const data = useModalStore((state) => state.extraData);
    const deleteCheckup = useAxiosPrivate(deleteCheckupService);

    const deleteMutuation = useMutation({
        mutationFn: deleteCheckup,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["checkups"] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al eliminar la consulta");
        },
    });

    const deleteThisCheckup = () => {
        if (data?.type == "DeleteCheckup") {
            deleteMutuation.mutate({ id: data.data.id });
        }
    };

    return (
        <div>
            <p className=" text-xl mt-8 text-center">
                ¿Estás seguro de que deseas eliminar esta consulta? Esta acción es <span className="font-bold">irreversible.</span>{" "}
            </p>

            <div className="modal-action mt-12">
                <button className="btn btn-outline" onClick={closeModal} disabled={deleteMutuation.isPending}>
                    Cancelar
                </button>

                <button className="btn btn-primary w-36" onClick={deleteThisCheckup} disabled={deleteMutuation.isPending}>
                    Sí
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
