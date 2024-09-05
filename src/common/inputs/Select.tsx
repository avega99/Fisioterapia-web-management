import { forwardRef, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLSelectElement> {
    label: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(({ label, children, ...props }, ref) => {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select ref={ref} className="select select-bordered" {...props}>
                {children}
            </select>
        </label>
    );
});

export default Select;
