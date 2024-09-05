import { IResponse } from "@/global/common.types";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { deletePlayersService } from "@/services/player";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Props {
    closeModal: VoidFunction;
}

const DeletePlayer = ({ closeModal }: Props) => {
    const extraData = useModalStore((state) => state.extraData);
    const queryClient = useQueryClient();
    const deletePlayer = useAxiosPrivate(deletePlayersService);
    if (extraData?.type != "player") return null;

    const deleteMutuation = useMutation({
        mutationFn: deletePlayer,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["players", extraData?.page] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al eliminar al jugador");
        },
    });

    const onDelete = () => {
        if (!extraData?.data.id) {
            return toast.error("Jugadro no seleccionado");
        }
        deleteMutuation.mutate({ id: extraData?.data.id });
    };

    return (
        <div>
            <p className=" text-xl mt-8 text-center">
                ¿Estás seguro de que deseas eliminar a {extraData.data.player_name} {extraData.data.last_name}? <br />
                <span className="font-bold">Esta acción es irreversible y ser perderán todas las consultas y archivos de este jugador</span>
            </p>

            <div className="modal-action mt-12">
                <button className="btn btn-outline" onClick={closeModal} disabled={deleteMutuation.isPending}>
                    Cancelar
                </button>

                <button className="btn btn-primary w-36" disabled={deleteMutuation.isPending} onClick={onDelete}>
                    {deleteMutuation.isPending ? "Eliminando" : "Sí"}
                </button>
            </div>
        </div>
    );
};

export default DeletePlayer;
