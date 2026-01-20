import React, {useRef, useState} from "react";
import "./Input.scss";

export enum InputColor {
    BLUE = "blue",
    GREEN = "green",
    YELLOW = "yellow",
}

export enum InputVariant {
    OUTLINED = "outlined",
    FILLED = "filled",
}

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    validate?: (value: string) => string | undefined;
    formatter?: (value: string) => string;
    variant?: InputVariant;
    color?: InputColor;
    clearable?: boolean;
    showCharCount?: boolean;
}

const Input: React.FC<Props> = ({
                                    value,
                                    onChange,
                                    label,
                                    error,
                                    helperText,
                                    leftIcon,
                                    rightIcon,
                                    validate,
                                    formatter,
                                    variant = InputVariant.OUTLINED,
                                    color = InputColor.BLUE,
                                    clearable = false,
                                    showCharCount = false,
                                    maxLength,
                                    className = '',
                                    onBlur,
                                    ...restProps

                                }) => {
    const [internalError, setInternalError] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const displayError = error || internalError;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        if (formatter) {
            newValue = formatter(newValue);
        }

        onChange(newValue);

        if (internalError) {
            setInternalError('');
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false)

        if (validate) {
            const validateError = validate(value);
            if (validateError) {
                setInternalError(validateError);
            }
        }

        onBlur?.(e);
    };

    const handleClear = () => {
        onChange('');
        inputRef.current?.focus();
    };

    return (
        <div className={`input ${className}`}>
            {label && (
                <label className={"input-label"}>
                    {label}
                    {restProps.required && <span className="required">*</span>}
                </label>
            )}

            <div className={`input-container ${isFocused ? 'focused' : ''}${variant} ${displayError ? error : ''}`}>
                {leftIcon && <span className={"input-icon left"}>{leftIcon}</span>}

                <input
                    ref={inputRef}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setIsFocused(true)}
                    maxLength={maxLength}
                    className={`input-field ${leftIcon ? 'left' : ''} ${displayError ? 'error' : ''} ${color}`}
                    {...restProps}
                />

                {clearable && value && ! restProps.disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="clear-button"
                        aria-label="Clear input"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.16318 9.83677C0.383896 10.0512 0.749651 10.0512 0.964062 9.83677L5 5.8002L9.03593 9.83677C9.25037 10.0512 9.62243 10.0575 9.83682 9.83677C10.0512 9.61605 10.0512 9.25653 9.83682 9.04211L5.80088 4.99921L9.83682 0.962636C10.0512 0.748192 10.0576 0.382379 9.83682 0.167936C9.61608 -0.052814 9.25037 -0.052814 9.03593 0.167936L5 4.20451L0.964062 0.167936C0.749651 -0.052814 0.377589 -0.0591211 0.16318 0.167936C-0.0512289 0.388686 -0.0512289 0.748192 0.16318 0.962636L4.19912 4.99921L0.16318 9.04211C-0.0512289 9.25653 -0.0575353 9.62235 0.16318 9.83677Z"/>
                        </svg>
                    </button>
                )}
                {rightIcon && <span className={"input-icon right"}>{rightIcon}</span>}
            </div>
            <div className="input-footer">
                {displayError && (
                    <span className={"error-message"}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.73193 14.1063H5.26027C5.40113 14.1063 5.50677 14.1486 5.61242 14.2542L6.69706 15.3318C7.58445 16.2262 8.40848 16.2192 9.29593 15.3318L10.3806 14.2542C10.4932 14.1486 10.5918 14.1063 10.7397 14.1063H12.261C13.5217 14.1063 14.1063 13.5288 14.1063 12.261V10.7397C14.1063 10.5918 14.1486 10.4932 14.2542 10.3806L15.3318 9.29593C16.2262 8.40848 16.2192 7.58445 15.3318 6.69706L14.2542 5.61242C14.1486 5.50677 14.1063 5.40113 14.1063 5.26027V3.73193C14.1063 2.47827 13.5288 1.88665 12.261 1.88665H10.7397C10.5918 1.88665 10.4932 1.85144 10.3806 1.74579L9.29593 0.66821C8.40848 -0.226255 7.58445 -0.219212 6.69706 0.66821L5.61242 1.74579C5.50677 1.85144 5.40113 1.88665 5.26027 1.88665H3.73193C2.47123 1.88665 1.88665 2.46418 1.88665 3.73193V5.26027C1.88665 5.40113 1.85144 5.50677 1.74579 5.61242L0.66821 6.69706C-0.226255 7.58445 -0.219212 8.40848 0.66821 9.29593L1.74579 10.3806C1.85144 10.4932 1.88665 10.5918 1.88665 10.7397V12.261C1.88665 13.5217 2.47123 14.1063 3.73193 14.1063Z" fill="#FF3B30"/>
                            <path d="M5.58642 11C5.25745 11 5 10.7351 5 10.3986C5 10.241 5.05721 10.0979 5.17163 9.98333L7.15254 8.00003L5.17163 6.00952C5.05721 5.90215 5 5.75179 5 5.59428C5 5.26492 5.25745 5.01432 5.58642 5.01432C5.7509 5.01432 5.87962 5.0716 5.99404 5.179L7.98926 7.16947L9.99882 5.17184C10.1204 5.05012 10.2491 5 10.4065 5C10.7354 5 11 5.25776 11 5.57995C11 5.74463 10.95 5.88067 10.8284 6.00237L8.83318 8.00003L10.8213 9.97612C10.9357 10.0907 10.9929 10.2339 10.9929 10.3986C10.9929 10.7351 10.7283 11 10.3921 11C10.2277 11 10.0775 10.9428 9.9702 10.8282L7.98926 8.83774L6.01552 10.8282C5.90107 10.9428 5.7509 11 5.58642 11Z" fill="white"/>
                        </svg>
                        {displayError}
                    </span>
                )}
                {!displayError && helperText && (
                    <span className={"helper-text"}>{helperText}</span>
                )}
                {showCharCount && maxLength && (
                    <span className={"char-count"}>{value.length} из {maxLength} символов</span>
                )}
            </div>
        </div>
    )
}

export default Input;