import React from "react";

interface Props extends React.HTMLProps<HTMLParagraphElement> {}

const ErrorText = ({ children, className }: Props) => {
    return <p className={`text-error ${className}`}>{children}</p>;
};

export default ErrorText;
