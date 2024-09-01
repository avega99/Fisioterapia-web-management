import { IPlayer } from "../../../global/player.types";

interface Props {
    player: IPlayer;
    onSelectOption: (player: IPlayer) => void;
}

const AutocompleteOption = ({ player, onSelectOption }: Props) => {
    return (
        <div key={player.id} onClick={() => onSelectOption(player)}>
            <div className="flex items-center space-x-3">
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img
                            src={
                                player.avatar
                                    ? player.avatar
                                    : "https://previews.123rf.com/images/graphicbee/graphicbee1707/graphicbee170700074/83672878-consulta-de-doctor-mujer-consulta-m%C3%A9dica-entre-el-m%C3%A9dico-y-su-paciente-en-el-escritorio.jpg"
                            }
                            alt="Avatar"
                        />
                    </div>
                </div>
                <div>
                    <div className="font-bold">{player.player_name}</div>
                    <div className="text-sm opacity-50">{player.last_name}</div>
                </div>
            </div>
        </div>
    );
};

export default AutocompleteOption;
