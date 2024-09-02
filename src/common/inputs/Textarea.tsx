import React, { forwardRef } from "react";

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
    containerStyle?: string;
    label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ label, containerStyle, ...props }, ref) => {
    return (
        <div className={containerStyle}>
            <label className="label">
                <span className={"label-text text-base-content "}>Tests</span>
            </label>
            <textarea ref={ref} className="textarea textarea-bordered textarea-ms w-full" {...props}></textarea>
        </div>
    );
});

export default Textarea;
