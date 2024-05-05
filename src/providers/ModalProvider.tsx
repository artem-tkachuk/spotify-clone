"use client"

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    // Prevent hydration error
    // Ensure none of the modals can be seen or opened during server-side rendering
    useEffect(() => {
        setIsMounted(true);
    }, [])

    // If not mounted ==> we're still server-side rendering ==> return nothing
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
}

export default ModalProvider;