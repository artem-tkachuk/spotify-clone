"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
    children: ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const { onOpen } = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        // TODO: reset any playing songs
        router.refresh();
        if (error) {
            // TODO: create a toast component for this error
            console.error("Error signing out:", error);
        }
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
                    ">
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
                    ">
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
                    ">
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
                    ">
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-x-4
                ">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            {/* Log out */}
                            <Button
                                onClick={handleLogout}
                                className="
                                    bg-white
                                    px-6
                                    py-2
                                "
                            >
                                Logout
                            </Button>
                            {/* Profile */}
                            <Button
                                onClick={() => router.push(`/account`)}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Sign up button */}
                            <div>
                                <Button
                                    onClick={onOpen}
                                    className="
                                        bg-transparent
                                        text-neutral-300
                                        font-medium
                                ">
                                    Sign up
                                </Button>
                            </div>
                            {/* Log in button */}
                            <div>
                                <Button
                                    onClick={onOpen}
                                    className="
                                        bg-white
                                        px-6
                                        py-2
                                ">
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;