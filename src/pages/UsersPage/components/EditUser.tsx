import Input from "@/common/inputs/Input";
import Select from "@/common/inputs/Select";
import ErrorText from "@/common/texts/ErrorText";
import { IEditUserForm, USER_ROLE, USER_STATUS } from "@/global/user.types";
import { getPhotoString } from "@/utils/form";
import { useForm } from "react-hook-form";
import user from "@/assets/icons/user.png";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { editUserService } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IResponse } from "@/global/common.types";
import { useModalStore } from "@/store/modalStore";

interface Props {
    closeModal: VoidFunction;
}

const EditUser = ({ closeModal }: Props) => {
    const updateUser = useAxiosPrivate(editUserService);
    const queryClient = useQueryClient();
    const extraData = useModalStore((state) => state.extraData);
    if (extraData?.type != "updateUser") return null;

    const form = useForm<IEditUserForm>({
        defaultValues: {
            id: extraData.data.id,
            avatar: extraData.data.avatar || "",
            name: extraData.data?.name,
            email: extraData.data?.email,
            status: extraData.data?.status,
            last_name: extraData.data?.last_name,
            role: extraData.data.role,
        },
    });
    const photo = form.watch("avatar");
    const stringURl = getPhotoString(photo);
    const updateMutuation = useMutation({
        mutationFn: updateUser,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: extraData?.type == "updateUser" ? extraData.queryKey : [] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al eliminar la consulta");
        },
    });

    const removePhoto = () => {
        form.setValue("avatar", "");
    };

    const onSubmit = (data: IEditUserForm) => {
        updateMutuation.mutate(data);
    };

    return (
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full grid place-content-center">
                <div className="indicator">
                    {photo && photo?.length > 0 && (
                        <button type="button" className="indicator-item btn btn-sm btn-circle" onClick={removePhoto}>
                            x
                        </button>
                    )}
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={stringURl ? stringURl : user} alt="Foto de perfil" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Input type="text" label="Nombre" {...form.register("name", { required: true })} />
                    {form.formState.errors.name && <ErrorText>El nombre es requerido</ErrorText>}
                </div>
                <div>
                    <Input type="text" label="Apellido" {...form.register("last_name", { required: true })} />
                    {form.formState.errors.last_name && <ErrorText>El apellido es requerido</ErrorText>}
                </div>
                <div>
                    <Input type="text" label="Correo" {...form.register("email", { required: true })} />
                    {form.formState.errors.last_name && <ErrorText>El correo es requerido</ErrorText>}
                </div>
                <div>
                    <Select type="text" label="Estatus" {...form.register("status", { required: true })}>
                        <option value={USER_STATUS.ACTIVE}>Activo</option>
                        <option value={USER_STATUS.INACTIVE}>Inactivo</option>
                    </Select>
                    {form.formState.errors.status && <ErrorText>El correo es requerido</ErrorText>}
                </div>
                <div>
                    <Select type="text" label="Rol" {...form.register("role", { required: true })}>
                        <option value={USER_ROLE.READ}>Lectura</option>
                        <option value={USER_ROLE.WRITE}>Escritura</option>
                    </Select>
                    {form.formState.errors.role && <ErrorText>El role es requerido</ErrorText>}
                </div>
                <div>
                    <Input label="Foto del usuario" type="file" accept="image/*" {...form.register("avatar")} />
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

export default EditUser;
