import TitleCard from "./components/TitleCard";
import TopSideButtons from "./components/TopSideButtons";
import avatar from "../../assets/icons/intro.png";
import dayjs from "dayjs";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useHeaderStore } from "../../store/headerStore";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { getCheckups } from "../../services/checkups";
import ErrorText from "../../common/ErrorText";

const HomePage = () => {
    const setTitle = useHeaderStore((state) => state.setTitle);
    const axiosPrivate = useAxiosPrivate();

    const checkuQuery = useQuery({
        queryKey: ["checkups"],
        queryFn: getCheckups(axiosPrivate),
    });

    useEffect(() => {
        setTitle("Home");
    }, []);

    const getDummyStatus = (index: number) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>;
        else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>;
        else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>;
        else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>;
        else return <div className="badge badge-ghost">Open</div>;
    };
    return (
        <div>
            {checkuQuery.isError && <ErrorText>errrrooooor</ErrorText>}
            <TitleCard title="Consultas" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Fecha de alta</th>
                                <th>Status</th>
                                <th>Asignado a</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={avatar} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Alejandro</div>
                                            <div className="text-sm opacity-50">Vega</div>
                                        </div>
                                    </div>
                                </td>
                                <td>avega@agmail.com</td>
                                <td>
                                    {dayjs(new Date())
                                        .subtract(5 * (3 + 2), "day")
                                        .format("DD MMM YY")}
                                </td>
                                <td>{getDummyStatus(3)}</td>
                                <td>vega</td>
                                <td>
                                    <button className="btn btn-square btn-ghost" onClick={() => {}}>
                                        <TrashIcon className="w-5" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={avatar} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Alejandro</div>
                                            <div className="text-sm opacity-50">Vega</div>
                                        </div>
                                    </div>
                                </td>
                                <td>avega@agmail.com</td>
                                <td>
                                    {dayjs(new Date())
                                        .subtract(5 * (6 + 2), "day")
                                        .format("DD MMM YY")}
                                </td>
                                <td>{getDummyStatus(6)}</td>
                                <td>vega</td>
                                <td>
                                    <button className="btn btn-square btn-ghost" onClick={() => {}}>
                                        <TrashIcon className="w-5" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={avatar} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Alejandro</div>
                                            <div className="text-sm opacity-50">Vega</div>
                                        </div>
                                    </div>
                                </td>
                                <td>avega@agmail.com</td>
                                <td>
                                    {dayjs(new Date())
                                        .subtract(5 * (5 + 2), "day")
                                        .format("DD MMM YY")}
                                </td>
                                <td>{getDummyStatus(5)}</td>
                                <td>vega</td>
                                <td>
                                    <button className="btn btn-square btn-ghost" onClick={() => {}}>
                                        <TrashIcon className="w-5" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </div>
    );
};

export default HomePage;
