import React, { PropsWithChildren } from "react";
import Subtitle from "../texts/Subtitle";
import BackButton from "../buttons/BackButton";

interface Props extends PropsWithChildren {
    TopSideButtons?: React.ReactNode;
    containerStyle?: string;
    title: string;
    showBack?: boolean;
}

const TitleCard = ({ TopSideButtons, containerStyle, title, children, showBack = false }: Props) => {
    return (
        <div className={"card w-full p-6 bg-base-100 shadow-xl " + (containerStyle || "mt-6")}>
            {/* Title for Card */}
            <Subtitle className={TopSideButtons ? "inline-block" : ""}>
                <div className="flex flex-row items-center gap-3">
                    {showBack && <BackButton />}
                    {title}
                </div>

                {/* Top side button, show only if present */}
                {TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>}
            </Subtitle>

            <div className="divider mt-2"></div>

            {/** Card Body */}
            <div className="h-full w-full pb-6 bg-base-100">{children}</div>
        </div>
    );
};

export default TitleCard;
