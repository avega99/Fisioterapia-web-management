import { useMemo } from "react";
import { ICheckup } from "../../../global/checkups.types";
import dayjs from "dayjs";
import { PLAYER_STATUS } from "../../../global/player.types";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import DocumentMagnifyingGlassIcon from "@heroicons/react/24/outline/DocumentMagnifyingGlassIcon";
import { Link } from "react-router-dom";
import PlayerStatusBadge from "../../../common/badges/PlayerStatusBadge";

interface Props {
    checkup: ICheckup;
}

const CheckupRow = ({ checkup }: Props) => {
    const formattedDate = useMemo(() => dayjs(checkup.createdAt).format("DD MMM YY"), [checkup.createdAt]);

    return (
        <tr>
            <td className="">
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img
                                src={
                                    checkup.player.avatar
                                        ? checkup.player.avatar
                                        : "https://previews.123rf.com/images/graphicbee/graphicbee1707/graphicbee170700074/83672878-consulta-de-doctor-mujer-consulta-m%C3%A9dica-entre-el-m%C3%A9dico-y-su-paciente-en-el-escritorio.jpg"
                                }
                                alt="Avatar"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{checkup.player.player_name}</div>
                        <div className="text-sm opacity-50">{checkup.player.last_name}</div>
                    </div>
                </div>
            </td>
            <td className="">{checkup.player.squad_number}</td>
            <td className="">{formattedDate}</td>
            <td className="">
                <PlayerStatusBadge status={checkup.player.status} />
            </td>
            <td className="">{checkup.createdBy.name}</td>
            <td className="">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-52">{checkup.notes}</p>
            </td>
            <td className="">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis  max-w-52">{checkup.tests}</p>
            </td>
            <td className="">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis  max-w-52">{checkup.results}</p>
            </td>
            <td className="text-center min-w-44">
                <div className="tooltip" data-tip="Ver detalles de consulta">
                    <Link to={`/consulta/${checkup.id}`}>
                        <button className="btn btn-square btn-ghost">
                            <DocumentMagnifyingGlassIcon className="w-5" />
                        </button>
                    </Link>
                </div>
                <div className="tooltip" data-tip="Editar consulta">
                    <button className="btn btn-square btn-ghost">
                        <PencilSquareIcon className="w-5" />
                    </button>
                </div>
                <div className="tooltip" data-tip="Eliminar consulta">
                    <button className="btn btn-square btn-ghost">
                        <TrashIcon className="w-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CheckupRow;
