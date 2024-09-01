import { useEffect, useState } from "react";

interface Props {
    time: number;
    value: string;
}

const useDebounce = ({ time, value }: Props) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
