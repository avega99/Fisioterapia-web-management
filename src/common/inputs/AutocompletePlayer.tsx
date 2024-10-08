import { ChangeEvent, useEffect, useState } from "react";
import Input from "./Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { searchPlayersService } from "../../services/player";
import { skipToken, useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebouncedValue";
import { IPlayer } from "../../global/player.types";
import AutocompleteOption from "../../pages/AddNewCheckupPage/components/AutocompleteOption";

interface Props {
    onSelectPlayer: (player: IPlayer | null) => void;
    value: IPlayer;
}

const AutocompletePlayer = ({ onSelectPlayer, value }: Props) => {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchPlayers = useAxiosPrivate(searchPlayersService);
    const deferredValue = useDebounce({ time: 500, value: search });

    const selectOption = (player: IPlayer) => {
        setShowResults(false);
        onSelectPlayer(player);
    };

    const playersQuery = useQuery({
        queryKey: ["searchPlayers", deferredValue],
        queryFn: deferredValue ? () => searchPlayers({ name: deferredValue }) : skipToken,
    });

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearch(newValue);
        if (newValue == "") {
            onSelectPlayer(null);
            setShowResults(false);
            return;
        }
        setShowResults(true);
    };

    useEffect(() => {
        if (value == null) {
            setSearch("");
        }
    }, [value]);

    return (
        <div className="relative">
            <Input type="search" label="Jugador" value={value ? `${value.player_name} ${value.last_name}` : search} onChange={onChangeValue} />
            {playersQuery.isSuccess && playersQuery.data.data.length > 0 && showResults && (
                <div className="card bg-base-200 gap-y-4 p-5 rounded-t-none">
                    {/* {playersQuery.isLoading && <span className="loading loading-dots loading-lg"></span>} */}
                    {playersQuery.data.data.map((player) => (
                        <AutocompleteOption key={player.id} onSelectOption={selectOption} player={player} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AutocompletePlayer;
