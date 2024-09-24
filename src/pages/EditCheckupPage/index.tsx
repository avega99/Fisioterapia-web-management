import BackButton from "@/common/buttons/BackButton";
import TitleCard from "@/common/cards/TitleCard";
import AutocompletePlayer from "@/common/inputs/AutocompletePlayer";
import Input from "@/common/inputs/Input";
import Select from "@/common/inputs/Select";
import Textarea from "@/common/inputs/Textarea";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import ErrorMessage from "@/common/texts/ErrorMessage";
import ErrorText from "@/common/texts/ErrorText";
import { IEditCheckupForm } from "@/global/checkups.types";
import { IResponse } from "@/global/common.types";
import { PLAYER_STATUS } from "@/global/player.types";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getCheckupDetailsService, upadateheckupService } from "@/services/checkups";
import { useAuthStore } from "@/store/authStore";
import { useHeaderStore } from "@/store/headerStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const EditCheckupPage = () => {
    const setTitle = useHeaderStore((state) => state.setTitle);
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    const getCheckup = useAxiosPrivate(getCheckupDetailsService);
    const upadteCheckup = useAxiosPrivate(upadateheckupService);
    const { id } = useParams();

    const checkupQuery = useQuery({
        queryKey: ["checkupDetails", id],
        queryFn: () => getCheckup({ id: id as string }),
    });

    const editMutuation = useMutation({
        mutationFn: upadteCheckup,
        onSuccess: async (data) => {
            queryClient.invalidateQueries({
                queryKey: ["checkups"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["checkupDetails", id],
            });

            reset();
            toast.success(data.message);
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            console.log({ error });
            toast.error(error.response?.data?.message || "Ups! algo salió mal al actualizar la consulta");
        },
    });

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setValue,
        control,
    } = useForm<IEditCheckupForm>();

    const onSubmit = (data: IEditCheckupForm) => {
        if (!id) return;
        editMutuation.mutate({ data: data, id: id });
    };

    useEffect(() => {
        setTitle("Editar consulta");
    }, []);

    useEffect(() => {
        if (checkupQuery.data) {
            setValue("player", checkupQuery.data.data.player);
            setValue("notes", checkupQuery.data.data.notes);
            setValue("results", checkupQuery.data.data.results);
            setValue("tests", checkupQuery.data.data.tests);
            setValue("appointment_date", new Date(checkupQuery.data.data.appointment_date).toISOString().slice(0, 16));
            setValue("player_status", checkupQuery.data.data.player_status);
        }
    }, [checkupQuery.data]);

    if (checkupQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (checkupQuery.isError) {
        return <ErrorMessage />;
    }

    if (checkupQuery.data.data.createdById !== user?.id) {
        return (
            <div>
                <BackButton />
                unauthorized. No puedes actualizar una consulta que no es tuya
            </div>
        );
    }
    return (
        <div>
            <TitleCard title="Editar" showBack>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1  gap-6">
                        <div>
                            <Controller
                                control={control}
                                name="player"
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => <AutocompletePlayer onSelectPlayer={onChange} value={value} />}
                            />
                            {errors.player && <ErrorText>El jugador es requerido</ErrorText>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input {...register("appointment_date", { required: true })} label="Fecha de consulta" type="datetime-local" />
                            {errors.appointment_date && <ErrorText>La fecha de consulta es requerida</ErrorText>}
                        </div>
                        <div>
                            <div>
                                <Select label="Condición del jugador" {...register("player_status", { required: true })}>
                                    <option value=""></option>
                                    <option value={PLAYER_STATUS.TRAINING}>Entrenando</option>
                                    <option value={PLAYER_STATUS.AVAILABLE}>Disponible para jugar</option>
                                    <option value={PLAYER_STATUS.INJURED}>Lesionado</option>
                                </Select>
                                {errors.player_status && <ErrorText>El estatus del jugador es requerido</ErrorText>}
                            </div>
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
                    <div>
                        <Link className="link link-success" to={`/editar-consulta-assets/${checkupQuery.data?.data.id}`}>
                            Editar las imagenes/videos de esta consulta
                        </Link>
                    </div>
                    <div className="mt-16">
                        <button type="submit" className="btn btn-primary float-right" disabled={editMutuation.isPending}>
                            {editMutuation.isPending ? "Enviando" : "Editar"}
                        </button>
                    </div>
                </form>
            </TitleCard>
        </div>
    );
};

export default EditCheckupPage;
