"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface HeaderProps {
    children: ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();

    const handleLogout = () => {
        // TODO Handle logout
    }

    return (
        <div 
            className={twMerge(`
                h-fit
                bg-gradient-to-b
                from-emerald-800
                p-6
            `)}
        >
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                ">
                    {/* Left button */}
                    <button 
                        type="button" 
                        title="Go back" 
                        onClick={() => router.back()}
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                    >
                        <RxCaretLeft className="text-white" size={35}/>
                    </button>
                    {/* Right button */}
                    <button 
                        type="button" 
                        title="Go forward" 
                        onClick={() => router.forward()}
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                    >
                        <RxCaretRight className="text-white" size={35}/>
                    </button>
                </div>
                <div className="
                    flex
                    md:hidden
                    gap-x-2
                    items-center
                ">
                    <button
                        type="button" 
                        title="Home"   
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                    >
                        <HiHome className="text-black" size={20}/>
                    </button>
                    <button
                        type="button" 
                        title="Home" 
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                    >
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-x-4
                ">
                    <>
                        {/* Sign up button */}
                        <div>
                            <Button
                                onClick={() => {}}
                                className="
                                    bg-transparent
                                    text-neutral-300
                                    font-medium
                                "
                            >
                                Sign up
                            </Button>
                        </div>
                        {/* Log in button */}
                        <div>
                            <Button
                                onClick={() => {}}
                                className="
                                    bg-white
                                    px-6
                                    py-2
                                "
                            >
                                Log in
                            </Button>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}

export default Header;