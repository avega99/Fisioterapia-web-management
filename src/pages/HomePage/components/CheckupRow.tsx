import { useMemo } from "react";
import { ICheckup } from "../../../global/checkups.types";
import dayjs from "dayjs";
import { PLAYER_STATUS } from "../../../global/player.types";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import DocumentMagnifyingGlassIcon from "@heroicons/react/24/outline/DocumentMagnifyingGlassIcon";

interface Props {
    checkup: ICheckup;
}

const CheckupRow = ({ checkup }: Props) => {
    const status = useMemo(() => {
        if (checkup.player.status == PLAYER_STATUS.AVAILABLE)
            return <div className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">Jugando</div>;
        if (checkup.player.status == PLAYER_STATUS.TRAINING)
            return <div className="nline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">Entrenando</div>;
        if (checkup.player.status == PLAYER_STATUS.INJURED)
            return <div className="inline-flex rounded-full bg-error bg-opacity-10 px-3 py-1 text-sm font-medium text-error">Lesionado</div>;
    }, [checkup.player]);

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
            <td className="">{status}</td>
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
                <button
                    className="btn btn-square btn-ghost"
                    onClick={(e) => {
                        alert("Ver detalles");
                    }}
                >
                    <DocumentMagnifyingGlassIcon className="w-5" />
                </button>
                <button
                    className="btn btn-square btn-ghost"
                    onClick={(e) => {
                        alert("editar");
                    }}
                >
                    <PencilSquareIcon className="w-5" />
                </button>
                <button
                    className="btn btn-square btn-ghost"
                    onClick={(e) => {
                        alert("remove");
                    }}
                >
                    <TrashIcon className="w-5" />
                </button>
            </td>
        </tr>
    );
};

export default CheckupRow;
