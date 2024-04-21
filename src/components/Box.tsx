import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

interface BoxProps {
    children: ReactNode,
    className?: string
}

const Box: React.FC<BoxProps> = ({ 
    children, 
    className 
}) => {
    return (
        <div className={twMerge(`
                bg-blue-950
                rounded-lg
                h-fit
                w-full 
            `, 
            className
        )}>
            {children}
        </div>
    );
}

export default Box;