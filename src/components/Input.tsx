import { forwardRef, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    // TODO: figure out why those are not included by default
    type: string;
    disabled: boolean;
    placeholder?: string;
    accept?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    placeholder,
    disabled,
    ...props
}, ref) => {
    return (
        <input
            accept={props.accept}
            type={type}
            placeholder={placeholder}
            className={twMerge(`
                flex
                w-full
                rounded-md
                bg-neutral-700
                border
                border-transparent
                px-3
                py-3
                text-sm
                file:border-0
                file:bg-transparent
                file:text-sm
                file:font-medium
                placeholder:text-neutral-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                focus:outline-none
            `,
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;