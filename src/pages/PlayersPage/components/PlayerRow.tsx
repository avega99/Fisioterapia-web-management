import PlayerStatusBadge from "@/common/badges/PlayerStatusBadge";
import { IPlayer, PLAYER_CATEGORY } from "@/global/player.types";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import dayjs from "dayjs";
import soccerPlayer from "@/assets/icons/soccer-player.png";
import { useMemo } from "react";

interface Props {
    player: IPlayer;
    hasWritePermissions: boolean;
}

const PlayerRow = ({ player, hasWritePermissions }: Props) => {
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

            <td>
                {hasWritePermissions && (
                    <button className="btn btn-square btn-ghost">
                        <TrashIcon className="w-5" />
                    </button>
                )}
            </td>
        </tr>
    );
};

export default PlayerRow;
