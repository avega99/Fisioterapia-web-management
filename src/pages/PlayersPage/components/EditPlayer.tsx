import Input from "@/common/inputs/Input";
import Select from "@/common/inputs/Select";
import ErrorText from "@/common/texts/ErrorText";
import { IEditPlayerForm, PLAYER_CATEGORY } from "@/global/player.types";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import user from "@/assets/icons/user.png";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { updatePlayersService } from "@/services/player";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IResponse } from "@/global/common.types";
import { getPhotoString } from "@/utils/form";

interface Props {
    closeModal: VoidFunction;
}

const EditPlayer = ({ closeModal }: Props) => {
    const extraData = useModalStore((state) => state.extraData);
    const queryClient = useQueryClient();
    const updatePlayer = useAxiosPrivate(updatePlayersService);
    if (extraData?.type != "player") return null;

    const updateMutuation = useMutation({
        mutationFn: updatePlayer,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["players", extraData?.page] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al editar el jugador");
        },
    });

    const form = useForm<IEditPlayerForm>({
        defaultValues: {
            avatar: extraData.data.avatar,
            category: extraData.data.category,
            last_name: extraData.data.last_name,
            player_name: extraData.data.player_name,
            squad_number: extraData.data.squad_number,
            id: extraData.data.id,
        },
    });
    const photo = form.watch("avatar");
    const stringURl = getPhotoString(photo);

    const onSubmit = (data: IEditPlayerForm) => updateMutuation.mutate(data);

    const removePhoto = () => {
        form.setValue("avatar", "");
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full grid place-content-center">
                <div className="indicator">
                    <button type="button" className="indicator-item btn btn-sm btn-circle" onClick={removePhoto}>
                        x
                    </button>
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={stringURl ? stringURl : user} alt="Foto de perfil" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Input type="text" label="Nombre" {...form.register("player_name", { required: true })} />
                    {form.formState.errors.player_name && <ErrorText>El nombre es requerido</ErrorText>}
                </div>
                <div>
                    <Input type="text" label="Apellido" {...form.register("last_name", { required: true })} />
                    {form.formState.errors.last_name && <ErrorText>El apellido es requerido</ErrorText>}
                </div>
                <div>
                    <Select label="Categoría" {...form.register("category", { required: true })}>
                        <option value=""></option>
                        <option value={PLAYER_CATEGORY.SUB_19}>Sub 19</option>
                        <option value={PLAYER_CATEGORY.SUB_23}>Sub 23</option>
                    </Select>
                    {form.formState.errors.category && <ErrorText>La categoría es requerida</ErrorText>}
                </div>
                <div>
                    <Input label="Número de playera" type="number" {...form.register("squad_number", { required: true })} />
                    {form.formState.errors.squad_number && <ErrorText>El número de playera es requerido</ErrorText>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <Input label="Foto de jugador" type="file" accept="image/*" {...form.register("avatar")} />
                </div>
            </div>

            <div className="modal-action">
                <button className="btn btn-ghost" onClick={closeModal} disabled={updateMutuation.isPending}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary px-6" disabled={updateMutuation.isPending}>
                    {updateMutuation.isPending ? "Enviando" : "Editar"}
                </button>
            </div>
        </form>
    );
};

export default EditPlayer;
