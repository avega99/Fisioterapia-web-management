import { useAuthStore } from "@/store/authStore";
import IconUser from "@/assets/icons/user.png";
import Input from "@/common/inputs/Input";
import { IEditMyProfileForm } from "@/global/user.types";
import { useForm } from "react-hook-form";
import ErrorText from "@/common/texts/ErrorText";
import { getPhotoString } from "@/utils/form";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { editMyProfilerService } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IResponse } from "@/global/common.types";
import toast from "react-hot-toast";

interface Props {
    closeModal: VoidFunction;
}

const EditMyProfile = ({ closeModal }: Props) => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    const editMyProfile = useAxiosPrivate(editMyProfilerService);

    const form = useForm<IEditMyProfileForm>({
        defaultValues: {
            avatar: user?.avatar || "",
            email: user?.email,
            last_name: user?.last_name,
            name: user?.name,
        },
    });

    const updateMutuation = useMutation({
        mutationFn: editMyProfile,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
            toast.success(data.message);
            closeModal();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al editar el jugador");
        },
    });

    const removePhoto = () => form.setValue("avatar", "");

    const onSubmit = (data: IEditMyProfileForm) => {
        updateMutuation.mutate(data);
    };

    const photo = form.watch("avatar");
    const stringURl = getPhotoString(photo);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full grid place-content-center">
                <div className="indicator">
                    <button type="button" className="indicator-item btn btn-sm btn-circle" onClick={removePhoto}>
                        x
                    </button>
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={stringURl ? stringURl : IconUser} alt="Foto de perfil" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <Input {...form.register("name", { required: true })} label="Nombre" placeholder="" />
                    {form.formState.errors.name && <ErrorText>El nombre es requerido</ErrorText>}
                </div>
                <div>
                    <Input {...form.register("last_name", { required: true })} label="Apellido" placeholder="" />
                    {form.formState.errors.last_name && <ErrorText>El apellido es requerido</ErrorText>}
                </div>
                <div>
                    <Input {...form.register("email", { required: true })} label="Correo" placeholder="" />
                    {form.formState.errors.email && <ErrorText>El correo es requerido</ErrorText>}
                </div>
                <div>
                    <Input {...form.register("avatar")} label="Foto de perfil" type="file" placeholder="" />
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

export default EditMyProfile;
