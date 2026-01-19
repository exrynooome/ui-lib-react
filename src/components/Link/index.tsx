import React from "react";
import "./Link.scss";

export enum LinkSize {
    SMALL = "button_14",
    NORMAL = 'button_15',
    LARGE = "button_18",
}

export enum LinkColor {
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
    YELLOW = "yellow",
    GRAY = "gray",
}

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    size?: LinkSize;
    icons?: React.ReactNode;
    color?: LinkColor;
}

const Link: React.FC<Props> = ({
                                   size = LinkSize.NORMAL,
                                   className,
                                   onClick,
                                   href,
                                   children,
                                   icons,
                                   color = LinkColor.BLUE,
                                   ...props
                               }) => (
    (
        <a
            className={`link${icons ? ` _icons` : ""} ${color} ${size}${
                className ? ` ${className}` : ""
            }`}
            onClick={onClick}
            href={href}
            {...props}
        >
            {children}
        </a>
    )
)

export default Link;