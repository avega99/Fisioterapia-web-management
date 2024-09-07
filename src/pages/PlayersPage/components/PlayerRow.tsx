import PlayerStatusBadge from "@/common/badges/PlayerStatusBadge";
import { IPlayer, PLAYER_CATEGORY } from "@/global/player.types";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import dayjs from "dayjs";
import soccerPlayer from "@/assets/icons/soccer-player.png";
import { Fragment, useMemo } from "react";
import { DocumentMagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface Props {
    player: IPlayer;
    hasWritePermissions: boolean;
    openDeleteModal: (player: IPlayer) => void;
    openEditModal: (player: IPlayer) => void;
}

const PlayerRow = ({ player, hasWritePermissions, openDeleteModal, openEditModal }: Props) => {
    const formattedDate = useMemo(() => dayjs(player.createdAt).format("DD MMM YY"), [player.createdAt]);
    const category = useMemo(() => {
        return player.category == PLAYER_CATEGORY.SUB_19 ? "Sub 19" : "Sub 23";
    }, [player.category]);

    return (
        <tr key={player.id}>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={player.avatar ? player.avatar : soccerPlayer} alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{player.player_name}</div>
                        <div className="text-sm opacity-50">{player.last_name}</div>
                    </div>
                </div>
            </td>
            <td>#{player.squad_number}</td>
            <td>
                <PlayerStatusBadge status={player.status} />
            </td>
            <td>{category}</td>
            <td>{formattedDate}</td>

            <td className="min-w-44">
                <Link to={`/jugador/${player.id}`}>
                    <div className="tooltip" data-tip="Ver historial de consultas del jugador">
                        <button className="btn btn-square btn-ghost">
                            <DocumentMagnifyingGlassIcon className="w-5" />
                        </button>
                    </div>
                </Link>
                {hasWritePermissions && (
                    <Fragment>
                        <div className="tooltip" data-tip="Eliminar jugador">
                            <button className="btn btn-square btn-ghost" onClick={() => openDeleteModal(player)}>
                                <TrashIcon className="w-5" />
                            </button>
                        </div>
                        <div className="tooltip" data-tip="Editar jugador">
                            <button className="btn btn-square btn-ghost" onClick={() => openEditModal(player)}>
                                <PencilSquareIcon className="w-5" />
                            </button>
                        </div>
                    </Fragment>
                )}
            </td>
        </tr>
    );
};

export default PlayerRow;
