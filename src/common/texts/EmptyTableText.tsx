import React from "react";

interface Props extends React.HTMLProps<HTMLTableDataCellElement> {
    title: string;
}

const EmptyTableText = ({ className, title, ...props }: Props) => {
    return (
        <tr>
            <td className={`text-center ${className}`} {...props}>
                <h1 className="text-lg font-medium">{title}</h1>
            </td>
        </tr>
    );
};

export default EmptyTableText;
