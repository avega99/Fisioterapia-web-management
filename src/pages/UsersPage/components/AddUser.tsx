import { IAddUserForm, USER_ROLE, USER_STATUS } from "@/global/user.types";
import { useForm } from "react-hook-form";
import doctor from "@/assets/icons/doctor.png";
import Input from "@/common/inputs/Input";
import ErrorText from "@/common/texts/ErrorText";
import Select from "@/common/inputs/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createUserService } from "@/services/user";
import { IResponse } from "@/global/common.types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useModalStore } from "@/store/modalStore";

interface Props {
    closeModal: VoidFunction;
}

const AddUser = ({ closeModal }: Props) => {
    const createUser = useAxiosPrivate(createUserService);
    const extraData = useModalStore((state) => state.extraData);
    const queryClient = useQueryClient();
    const form = useForm<IAddUserForm>();
    const files = form.watch("avatar");
    const createMututation = useMutation({
        mutationFn: createUser,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: extraData?.type == "addUser" ? extraData.queryKey : [] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al eliminar la consulta");
        },
    });

    const removePhoto = () => form.resetField("avatar");

    const onSubmit = (data: IAddUserForm) => {
        createMututation.mutate(data);
    };

    return (
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full grid place-content-center">
                <div className="indicator">
                    {files && files?.length > 0 && (
                        <button type="button" className="indicator-item btn btn-sm btn-circle" onClick={removePhoto}>
                            x
                        </button>
                    )}
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={files?.[0] ? URL.createObjectURL(files[0]) : doctor} alt="Foto de perfil" />
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
                    <Input type="password" label="Contraseña" {...form.register("password", { required: true })} />
                    {form.formState.errors.last_name && <ErrorText>La contraseña es requerida</ErrorText>}
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
            </div>
            <div>
                <Input label="Foto del usuario" type="file" accept="image/*" {...form.register("avatar")} />
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

export default AddUser;
