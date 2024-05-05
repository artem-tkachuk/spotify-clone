"use client"

import { useEffect, useState } from "react";

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
            Modals!   
        </>
    );
}

export default ModalProvider;