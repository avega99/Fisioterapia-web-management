import BackButton from "@/common/buttons/BackButton";
import TitleCard from "@/common/cards/TitleCard";
import AutocompletePlayer from "@/common/inputs/AutocompletePlayer";
import Textarea from "@/common/inputs/Textarea";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import ErrorText from "@/common/texts/ErrorText";
import { IEditCheckupForm } from "@/global/checkups.types";
import { IResponse } from "@/global/common.types";
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
        }
    }, [checkupQuery.data]);

    if (checkupQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (checkupQuery.isError) {
        return <div>Error</div>;
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
