import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getCheckupDetailsService } from "../../services/checkups";
import { useQuery } from "@tanstack/react-query";
import { useHeaderStore } from "../../store/headerStore";
import { useEffect } from "react";
import LoadingIndicator from "@/common/loading/LoadingIndicator";
import PlayerStatusBadge from "@/common/badges/PlayerStatusBadge";
import { PLAYER_CATEGORY, PLAYER_STATUS } from "@/global/player.types";
import BackButton from "@/common/buttons/BackButton";
import { PhotoView } from "react-photo-view";
import { useAuthStore } from "@/store/authStore";
import doctor from "@/assets/icons/doctor.png";
import player from "@/assets/icons/soccer-player.png";

const playerCategory = {
    [PLAYER_CATEGORY.SUB_19]: "Sub 19",
    [PLAYER_CATEGORY.SUB_23]: "Sub 23",
};
const ring = {
    [PLAYER_STATUS.AVAILABLE]: "ring-success",
    [PLAYER_STATUS.INJURED]: "ring-error",
    [PLAYER_STATUS.TRAINING]: "ring-warning",
};

const CheckupDetailsPage = () => {
    const setTitle = useHeaderStore((state) => state.setTitle);
    const user = useAuthStore((state) => state.user);
    const { id } = useParams();
    const getCheckupDetails = useAxiosPrivate(getCheckupDetailsService);

    const checkupQuery = useQuery({
        queryKey: ["checkupDetails", id],
        queryFn: () => getCheckupDetails({ id: id as string }),
    });

    useEffect(() => {
        setTitle("Detalles de consulta");
    }, []);

    if (checkupQuery.isPending) {
        return <LoadingIndicator />;
    }

    if (checkupQuery.isError) {
        return <div>Error!</div>;
    }

    const images = checkupQuery.data.data.media.filter((asset) => asset.type == "IMAGE");
    const videos = checkupQuery.data.data.media.filter((asset) => asset.type == "VIDEO");
    const isMine = user?.id === checkupQuery.data.data.createdById;

    return (
        checkupQuery.isSuccess && (
            <div className="grow pt-4 overflow-y-scroll">
                <div className="no-prose">
                    <BackButton />
                </div>
                <article className="prose max-w-full">
                    {/* <div className="flex items-center gap-5">
                        <h1 className="mb-0">Detalles</h1>
                    </div> */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <h2>Jugador</h2>
                                <div>
                                    <div className="flex flex-1 items-center justify-center md:justify-start">
                                        <div className="avatar not-prose ml-2 mb-4">
                                            <div
                                                className={`${
                                                    ring[checkupQuery.data.data.player.status]
                                                } ring-offset-base-100 max-w-44 rounded-full ring ring-offset-2 `}
                                            >
                                                <img
                                                    src={checkupQuery.data.data.player.avatar ? checkupQuery.data.data.player.avatar : player}
                                                    alt="Foto de perfil jugador"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        Nombre:{" "}
                                        <span className="font-bold">{`${checkupQuery.data.data.player.player_name} ${checkupQuery.data.data.player.last_name}`}</span>
                                    </p>
                                    <p>
                                        Categoría: <span className="font-bold">{playerCategory[checkupQuery.data.data.player.category]}</span>
                                    </p>
                                    <p>
                                        Número: <span className="font-bold">{checkupQuery.data.data.player.squad_number}</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                        Estatus:
                                        <PlayerStatusBadge status={checkupQuery.data.data.player.status} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="" id="getstarted1">
                                    Atendido Por
                                </h2>
                                <div className="flex flex-1 items-center justify-center md:justify-start">
                                    <div className="avatar not-prose ml-2 mb-4">
                                        <div className={`ring-primary ring-offset-base-100 max-w-44 rounded-full ring ring-offset-2`}>
                                            <img
                                                src={checkupQuery.data.data.createdBy.avatar ? checkupQuery.data.data.createdBy.avatar : doctor}
                                                alt="Foto de perfil jugador"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Nombre: <span className="font-bold">{checkupQuery.data.data.createdBy.name}</span>
                                </p>

                                <p>
                                    Correo: <span className="font-bold">{checkupQuery.data.data.createdBy.email}</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2>Tratamiento</h2>
                            <h4>Tratamiento/Obersvaciones - </h4>
                            <p>{checkupQuery.data.data.notes}</p>
                            <h4>Tests - </h4>
                            <p>{checkupQuery.data.data.tests}</p>
                            <h4>Resultados - </h4>
                            <p>{checkupQuery.data.data.results}</p>
                        </div>

                        <div>
                            <h2 id="getstarted3">Imagenes</h2>

                            <div className="carousel rounded-box gap-2 not-prose">
                                {images.map((asset) => (
                                    <PhotoView src={asset.url} key={asset.id}>
                                        <div key={asset.id} className="carousel-item max-h-96 max-w-full md:w-96 ">
                                            <img src={asset.url} alt="image" />
                                        </div>
                                    </PhotoView>
                                ))}
                            </div>
                            {images.length == 0 && <h1 className="text-lg font-medium">No hay imagenes para mostrar</h1>}
                        </div>
                        <div>
                            <h2>Videos</h2>
                            <div className="carousel rounded-box gap-2 not-prose">
                                {videos.map((asset) => (
                                    <div key={asset.id} className="carousel-item max-h-96 max-w-full md:w-96">
                                        <video src={asset.url} controls>
                                            Tu navegador la reproducción de videos
                                        </video>
                                    </div>
                                ))}
                            </div>
                            {videos.length == 0 && <h1 className="text-lg font-medium">No hay videos para mostrar</h1>}
                        </div>
                    </div>
                    {isMine && (
                        <Link className="link link-success" to={`/editar-consulta/${checkupQuery.data.data.id}`}>
                            Editar esta consulta
                        </Link>
                    )}
                </article>
            </div>
        )
    );
};

export default CheckupDetailsPage;
