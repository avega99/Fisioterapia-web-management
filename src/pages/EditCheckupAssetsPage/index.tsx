import TitleCard from "@/common/cards/TitleCard";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import { ICheckupMedia } from "@/global/checkupMedia.interfaces";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getCheckupDetailsService } from "@/services/checkups";
import { getCheckupAssetsService } from "@/services/mediaCheckups";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { PhotoView } from "react-photo-view";
import { useParams } from "react-router-dom";

const EditCheckupAssetsPage = () => {
    const { id } = useParams();
    const user = useAuthStore((state) => state.user);
    const getCheckupAssets = useAxiosPrivate(getCheckupAssetsService);
    const getCheckupDetails = useAxiosPrivate(getCheckupDetailsService);

    const assetsQuery = useQuery({
        queryKey: ["checkupAssets", id],
        queryFn: () => getCheckupAssets({ id: id as string }),
        select: (data) => {
            const newData: { videos: ICheckupMedia[]; images: ICheckupMedia[] } = {
                videos: [],
                images: [],
            };

            data.data.forEach((asset) => {
                if (asset.type == "IMAGE") {
                    newData.images.push(asset);
                } else {
                    newData.videos.push(asset);
                }
            });

            return newData;
        },
    });
    const checkupQuery = useQuery({
        queryKey: ["checkupDetails", id],
        queryFn: () => getCheckupDetails({ id: id as string }),
    });

    if (assetsQuery.isPending || checkupQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (assetsQuery.isError || checkupQuery.isError) {
        return <div>handler error</div>;
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
                            <h1>Imagenes</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10">
                                {assetsQuery.data.images.map((image) => (
                                    <div className="flex flex-col  gap-4" key={image.id}>
                                        <PhotoView src={image.url}>
                                            <img src={image.url} className="w-full" alt="" />
                                        </PhotoView>
                                        <button className="btn btn-outline btn-error mt-auto">Eliminar</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <h1>Videos</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                                {assetsQuery.data.videos.map((video) => (
                                    <div className="flex flex-col  gap-4" key={video.id}>
                                        <video src={video.url} controls className="w-full">
                                            Tu navegador la reproducción de videos
                                        </video>
                                        <button className="btn btn-outline btn-error mt-auto">Eliminar</button>
                                    </div>
                                ))}
                                {assetsQuery.data.videos.length == 0 && <div>No hay videos</div>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-16">
                        <button type="submit" className="btn btn-primary float-right">
                            Enviar
                        </button>
                    </div>
                </TitleCard>
            )}
        </div>
    );
};

export default EditCheckupAssetsPage;
