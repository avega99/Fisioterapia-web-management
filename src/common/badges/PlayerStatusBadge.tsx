import { PLAYER_STATUS } from "../../global/player.types";

interface Props {
    status: PLAYER_STATUS;
}

const PlayerStatusBadge = ({ status }: Props) => {
    if (status == PLAYER_STATUS.AVAILABLE)
        return <div className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success text-nowrap">Disponible para jugar</div>;
    if (status == PLAYER_STATUS.TRAINING)
        return <div className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">Entrenando</div>;
    if (status == PLAYER_STATUS.INJURED)
        return <div className="inline-flex rounded-full bg-error bg-opacity-10 px-3 py-1 text-sm font-medium text-error">Lesionado</div>;
    return <div></div>;
};

export default PlayerStatusBadge;
