import TitleCard from "../../common/TitleCard";
import TopSideButtons from "./components/TopSideButtons";
import { useHeaderStore } from "../../store/headerStore";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { getCheckupsService } from "../../services/checkups";
import ErrorText from "../../common/ErrorText";
import CheckupRow from "./components/CheckupRow";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
    const setTitle = useHeaderStore((state) => state.setTitle);
    const getCheckups = useAxiosPrivate(getCheckupsService);

    const checkuQuery = useQuery({
        queryKey: ["checkups"],
        queryFn: () => getCheckups(undefined),
    });

    useEffect(() => {
        setTitle("Home");
    }, []);

    return (
        <div>
            {checkuQuery.isError && <ErrorText>errrrooooor</ErrorText>}
            <TitleCard title="Consultas" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Nombre Jugador</th>
                                <th># de playera</th>
                                <th>Fecha de </th>
                                <th>Condicion </th>
                                <th>Atendido por</th>
                                <th className="tracking-wider ">Tratamiento</th>
                                <th className="tracking-wider">Tests</th>
                                <th className="tracking-wider">Resultados</th>
                                <th className=""></th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkuQuery.isSuccess ? checkuQuery.data.data.map((checkup) => <CheckupRow key={checkup.id} checkup={checkup} />) : null}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </div>
    );
};

export default HomePage;
