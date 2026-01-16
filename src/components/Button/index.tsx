import React from "react";
import "./Button.scss";

export enum ButtonStyle {
    MAIN = "button_main",
    TEXT = "button_text",
}

export enum ButtonSize {
    SMALL = "button_14",
    NORMAL = 'button_15',
    LARGE = "button_18",
}

export enum ButtonColor {
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
    YELLOW = "yellow",
    GRAY = "gray",
}

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    style: ButtonStyle;
    size?: ButtonSize;
    disabled?: boolean;
    icons?: React.ReactNode;
    color?: ButtonColor;
}

const Button: React.FC<Props> = ({
                                     style,
                                     size = ButtonSize.NORMAL,
                                     className,
                                     onClick,
                                     disabled,
                                     href,
                                     children,
                                     icons,
                                     color = ButtonColor.BLUE,
                                     ...props
                                 }) => (
    (
        <a
            className={`button${icons ? ` _icons` : ""} ${color} ${style} ${size}${
                className ? ` ${className}` : ""
            }${disabled ? ` _disabled` : ""}`}
            onClick={!disabled ? onClick : undefined}
            href={!disabled ? href : undefined}
            {...props}
        >
            {children}
        </a>
    )
)

export default Button;