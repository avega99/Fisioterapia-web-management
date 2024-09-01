import { Controller, useForm } from "react-hook-form";
import Input from "../../common/Input";
import Textarea from "../../common/Textarea";
import TitleCard from "../../common/TitleCard";
import ErrorText from "../../common/ErrorText";
import { ICheckupForm } from "../../global/checkups.types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { createCheckupsService } from "../../services/checkups";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IResponse } from "../../global/common.types";
import Autocomplete from "./components/Autocomplete";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddNewCheckupPage = () => {
    const queryClient = useQueryClient();
    const createCheckup = useAxiosPrivate(createCheckupsService);

    const createCheckupMutuation = useMutation({
        mutationFn: createCheckup,
        onSuccess: () => {
            toast.success("Consulata agregada correctamente!");
            reset();
            queryClient.invalidateQueries({ queryKey: ["checkups"] });
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            console.log({ error });
            toast.success(error?.response?.data?.message || "Hubo un error al agregar la consulta");
        },
    });

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        control,
    } = useForm<ICheckupForm>();

    const onSubmit = (data: ICheckupForm) => createCheckupMutuation.mutate(data);

    return (
        <div>
            <TitleCard title="Agregar consulta">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1  gap-6">
                        <div>
                            <Controller
                                control={control}
                                name="player"
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => <Autocomplete onSelectPlayer={onChange} value={value} />}
                            />
                            {errors.player && <ErrorText>El jugador es requerido</ErrorText>}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid grid-cols-1  gap-6">
                        <div>
                            <Textarea {...register("notes", { required: true })} label="Tratamiento y observaciones" placeholder="Observaciones" />
                            {errors.notes && <ErrorText>Las notas son requeridas</ErrorText>}
                        </div>
                        <div>
                            <Textarea {...register("tests", { required: true })} label="Tests" placeholder="tests" />
                            {errors.tests && <ErrorText>Los tests son requeridos</ErrorText>}
                        </div>
                        <div>
                            <Textarea {...register("results", { required: true })} label="Resultados" placeholder="resultados" />
                            {errors.results && <ErrorText>Los resultados son requeridos</ErrorText>}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <input
                                {...register("assets", {
                                    required: true,
                                    validate: {
                                        matchMedia: (files) => files.length <= 5 || "Solo puedes subir hasta 5 archivos",
                                    },
                                })}
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                            {errors.assets && (
                                <ErrorText>{errors.assets.message ? errors.assets.message : "Al menos una imagen o video es requerido"}</ErrorText>
                            )}
                        </div>
                    </div>
                    <div className="mt-16">
                        <button type="submit" className="btn btn-primary float-right" disabled={createCheckupMutuation.isPending}>
                            {createCheckupMutuation.isPending ? "Enviando" : "Enviar"}
                        </button>
                    </div>
                </form>
            </TitleCard>
        </div>
    );
};

export default AddNewCheckupPage;
