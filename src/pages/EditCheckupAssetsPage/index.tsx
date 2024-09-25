import TitleCard from "@/common/cards/TitleCard";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import ErrorMessage from "@/common/texts/ErrorMessage";
import ErrorText from "@/common/texts/ErrorText";
import { ICheckupMedia, IMediaForm } from "@/global/checkupMedia.interfaces";
import { IResponse } from "@/global/common.types";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getCheckupDetailsService } from "@/services/checkups";
import { getCheckupAssetsService, uploadAssetsService } from "@/services/mediaCheckups";
import { useAuthStore } from "@/store/authStore";
import { BodyType, useModalStore } from "@/store/modalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PhotoView } from "react-photo-view";
import { useParams } from "react-router-dom";

const EditCheckupAssetsPage = () => {
    const { id } = useParams();
    const user = useAuthStore((state) => state.user);
    const openModal = useModalStore((state) => state.openModal);
    const queryClient = useQueryClient();
    const getCheckupAssets = useAxiosPrivate(getCheckupAssetsService);
    const getCheckupDetails = useAxiosPrivate(getCheckupDetailsService);
    const uploadAssets = useAxiosPrivate(uploadAssetsService);
    const form = useForm<IMediaForm>({
        defaultValues: { checkupId: id },
    });
    const files = form.watch("files");

    const assetsQuery = useQuery({
        queryKey: ["checkupAssets", id],
        queryFn: () => getCheckupAssets({ id: id as string }),
        select: (data) => {
            const newData: { videos: ICheckupMedia[]; images: ICheckupMedia[]; docs: ICheckupMedia[] } = {
                videos: [],
                images: [],
                docs: [],
            };

            data.data.forEach((asset) => {
                if (asset.type == "IMAGE") {
                    newData.images.push(asset);
                } else if (asset.type === "VIDEO") {
                    newData.videos.push(asset);
                } else {
                    newData.docs.push(asset);
                }
            });

            return newData;
        },
    });
    const checkupQuery = useQuery({
        queryKey: ["checkupDetails", id],
        queryFn: () => getCheckupDetails({ id: id as string }),
    });

    const upalodMutuation = useMutation({
        mutationFn: uploadAssets,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["checkupAssets", id] });
            toast.success(data.message);
            form.reset();
        },
        onError: (error: AxiosError<IResponse<void>>) => {
            toast.error(error?.response?.data?.message || "hubo un error al eliminar el archivo");
        },
    });

    const maxFiles = useMemo(() => {
        return 5 - ((assetsQuery.data?.images.length || 0) - (assetsQuery.data?.videos.length || 0) - (assetsQuery.data?.docs.length || 0));
    }, [assetsQuery.data]);

    const openDeleteModal = useCallback((data: ICheckupMedia) => {
        openModal({ bodyType: BodyType.DELETE_ASSET, title: "Confirmación", extraData: { data: data, type: "DeleteAsset" } });
    }, []);

    const onSubmit = useCallback((data: IMediaForm) => {
        upalodMutuation.mutate(data);
    }, []);

    if (assetsQuery.isPending || checkupQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (assetsQuery.isError || checkupQuery.isError) {
        return <ErrorMessage />;
    }
    if (!assetsQuery.isSuccess || !checkupQuery.isSuccess || !user) return null;

    return (
        <div>
            {user?.id != checkupQuery.data.data.createdById ? (
                <div>Unauthorized no puedes actualizar datos que no son tuyos</div>
            ) : (
                <TitleCard title="Assets" showBack>
                    <div className="flex flex-col gap-5">
                        <div>
                            <h1 className="text-xl my-5 font-medium">Imagenes</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10">
                                {assetsQuery.data.images.map((image) => (
                                    <div className="flex flex-col  gap-4" key={image.id}>
                                        <PhotoView src={image.url}>
                                            <img src={image.url} className="w-full" alt="" />
                                        </PhotoView>
                                        <button className="btn btn-outline btn-error mt-auto" onClick={() => openDeleteModal(image)}>
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {assetsQuery.data.images.length == 0 && <h1 className="text-lg font-medium">No hay imagenes para mostrar</h1>}
                        </div>
                        <div className="divider"></div>
                        <div>
                            <h1 className="text-xl my-5 font-medium">Videos</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                                {assetsQuery.data.videos.map((video) => (
                                    <div className="flex flex-col  gap-4" key={video.id}>
                                        <video src={video.url} controls className="w-full">
                                            Tu navegador la reproducción de videos
                                        </video>
                                        <button className="btn btn-outline btn-error mt-auto" onClick={() => openDeleteModal(video)}>
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                                {assetsQuery.data.videos.length == 0 && <h1 className="text-lg font-medium">No hay videos para mostrar</h1>}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <h1 className="text-xl my-5 font-medium">Documentos</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                                {assetsQuery.data.docs.map((doc) => (
                                    <div className="flex flex-col  gap-4" key={doc.id}>
                                        <a href={doc.url} download={doc.url}>
                                            {doc.asset_name}
                                        </a>
                                        <button className="btn btn-outline btn-error mt-auto" onClick={() => openDeleteModal(doc)}>
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                                {assetsQuery.data.docs.length == 0 && <h1 className="text-lg font-medium">No hay documentos para mostrar</h1>}
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mt-5">
                            <h1 className="text-xl my-5 font-medium">Agregar archivos</h1>
                            <input
                                {...form.register("files", {
                                    required: true,
                                    validate: {
                                        matchMedia: (files) => files.length <= maxFiles || `Solo puedes subir hasta ${maxFiles} archivos`,
                                    },
                                })}
                                type="file"
                                accept="image/*,video/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                                multiple
                                className="file-input file-input-bordered w-full max-w-xs"
                                disabled={maxFiles === 0}
                            />
                            {form.formState.errors.files && (
                                <ErrorText>
                                    {form.formState.errors.files.message ? form.formState.errors.files.message : "Al menos una imagen o video es requerido"}
                                </ErrorText>
                            )}
                        </div>
                        <div className="mt-16">
                            <button type="submit" className="btn btn-primary float-right" disabled={!files || files.length == 0}>
                                {upalodMutuation.isPending ? "Enviando" : "Enviar"}
                            </button>
                        </div>
                    </form>
                </TitleCard>
            )}
        </div>
    );
};

export default EditCheckupAssetsPage;
