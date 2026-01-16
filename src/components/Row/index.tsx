import React, { FunctionComponent } from "react";
import "./Row.scss";

type Props = {
    className?: string;
    children?: any;
};

const Row: FunctionComponent<Props> = ({ children, className }) => {
    return (
        <div className={`row${className ? ` ${className}` : ""}`}>
            {children}
        </div>
    );
};

export default Row;