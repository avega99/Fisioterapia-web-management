import Input from "@/common/inputs/Input";
import Select from "@/common/inputs/Select";
import ErrorText from "@/common/texts/ErrorText";
import { IResponse } from "@/global/common.types";
import { IPlayerForm, PLAYER_CATEGORY } from "@/global/player.types";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createPlayersService } from "@/services/player";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import user from "@/assets/icons/user.png";

interface Props {
    closeModal: VoidFunction;
}

const AddPlayer = ({ closeModal }: Props) => {
    const createPlayer = useAxiosPrivate(createPlayersService);
    const queryClient = useQueryClient();
    const form = useForm<IPlayerForm>();
    const files = form.watch("avatar");

    const createMututation = useMutation({
        mutationFn: createPlayer,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["players", 1] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al eliminar la consulta");
        },
    });

    const removePhoto = () => {
        form.setValue("avatar", undefined);
        form.trigger("avatar");
    };

    const onSubmit = (data: IPlayerForm) => createMututation.mutate(data);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full grid place-content-center">
                <div className="indicator">
                    <button type="button" className="indicator-item btn btn-sm btn-circle" onClick={removePhoto}>
                        x
                    </button>
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={files?.[0] ? URL.createObjectURL(files[0]) : user} alt="Foto de perfil" />
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
                <button className="btn btn-ghost" onClick={closeModal} disabled={createMututation.isPending}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary px-6" disabled={createMututation.isPending}>
                    {createMututation.isPending ? "Enviando" : "Enviar"}
                </button>
            </div>
        </form>
    );
};

export default AddPlayer;
