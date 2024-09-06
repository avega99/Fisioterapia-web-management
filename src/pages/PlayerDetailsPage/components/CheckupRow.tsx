import doctor from "@/assets/icons/doctor.png";
import { ILoggedUser } from "@/global/auth.types";
import { ICheckup } from "@/global/checkups.types";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import DocumentMagnifyingGlassIcon from "@heroicons/react/24/outline/DocumentMagnifyingGlassIcon";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useMemo } from "react";

interface Props {
    checkup: ICheckup;
    user: ILoggedUser | null;
    onDeleteCheckup: (data: ICheckup) => void;
}

const CheckupRow = ({ checkup, user, onDeleteCheckup }: Props) => {
    const formattedDate = useMemo(() => dayjs(checkup.createdAt).format("DD MMM YY"), [checkup.createdAt]);
    const isMine = useMemo(() => {
        return checkup.createdBy.id === user?.id;
    }, [checkup]);

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={doctor} alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{checkup.createdBy.name}</div>
                        <div className="text-sm opacity-50">poner despues</div>
                    </div>
                </div>
            </td>
            <td>{formattedDate}</td>
            <td>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-32">{checkup.notes}</p>
            </td>
            <td className="">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis  max-w-32">{checkup.tests}</p>
            </td>
            <td className="">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis  max-w-32">{checkup.results}</p>
            </td>
            <td className={`${isMine ? "text-center" : "text-left"} min-w-44`}>
                <div className="tooltip" data-tip="Ver detalles de consulta">
                    <Link to={`/consulta/${checkup.id}`}>
                        <button className="btn btn-square btn-ghost">
                            <DocumentMagnifyingGlassIcon className="w-5" />
                        </button>
                    </Link>
                </div>
                {isMine && (
                    <Fragment>
                        <div className="tooltip" data-tip="Editar consulta">
                            <Link to={`/editar-consulta/${checkup.id}`}>
                                <button className="btn btn-square btn-ghost">
                                    <PencilSquareIcon className="w-5" />
                                </button>
                            </Link>
                        </div>
                        <div className="tooltip" data-tip="Eliminar consulta">
                            <button className="btn btn-square btn-ghost" onClick={() => onDeleteCheckup(checkup)}>
                                <TrashIcon className="w-5" />
                            </button>
                        </div>
                    </Fragment>
                )}
            </td>
        </tr>
    );
};

export default CheckupRow;
