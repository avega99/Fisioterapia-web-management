import React, { forwardRef } from "react";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    containerStyle?: string;
    label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, containerStyle, className, ...inputProps }, ref) => {
    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content"}>{label}</span>
            </label>
            {inputProps.type == "file" ? (
                <input ref={ref} {...inputProps} className={`file-input file-input-bordered w-full${className}`} />
            ) : (
                <input ref={ref} {...inputProps} className={`input  input-bordered w-full ${className}`} />
            )}
        </div>
    );
});

export default Input;
