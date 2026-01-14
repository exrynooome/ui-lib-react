import React, { FunctionComponent } from "react";
import "./Container.scss";

type Props = {
    className?: string;
    children?: any;
};

const Container: FunctionComponent<Props> = ({ children, className }) => {
    return (
        <div className={`container${className ? ` ${className}` : ""}`}>
            {children}
        </div>
    );
};

export default Container;