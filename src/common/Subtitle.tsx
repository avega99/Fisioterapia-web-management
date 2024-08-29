import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className: string;
}

const Subtitle = ({ className, children }: Props) => {
    return <div className={`text-xl font-semibold ${className}`}>{children}</div>;
};

export default Subtitle;
