import { IResponse } from "@/global/common.types";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { deleteAssetService } from "@/services/mediaCheckups";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Props {
    closeModal: VoidFunction;
}

const DeleteAssetModal = ({ closeModal }: Props) => {
    const asset = useModalStore((state) => state.extraData);
    const queryClient = useQueryClient();
    const deleteAsset = useAxiosPrivate(deleteAssetService);
    if (asset?.type != "DeleteAsset") return null;

    const deleteMutuation = useMutation({
        mutationFn: deleteAsset,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["checkupAssets", asset.data.checkupId.toString()] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al eliminar el archivo");
        },
    });

    return (
        <div>
            <p className=" text-xl mt-8 text-center">
                ¿Estás seguro de que deseas eliminar {asset.data.type == "IMAGE" ? "esta imagen" : "este video"}? Esta acción es{" "}
                <span className="font-bold">irreversible.</span>{" "}
            </p>
            <div>
                {asset.data.type == "IMAGE" && (
                    <div className="w-full max-h-44 bg-slate-500 overflow-hidden rounded-md mt-4">
                        <img src={asset.data.url} className="w-full  object-cover" alt="imagen" />
                    </div>
                )}
            </div>

            <div className="modal-action mt-12">
                <button className="btn btn-outline" onClick={closeModal} disabled={deleteMutuation.isPending}>
                    Cancelar
                </button>

                <button className="btn btn-primary w-36" disabled={deleteMutuation.isPending} onClick={() => deleteMutuation.mutate({ id: asset.data.id })}>
                    Sí
                </button>
            </div>
        </div>
    );
};

export default DeleteAssetModal;
