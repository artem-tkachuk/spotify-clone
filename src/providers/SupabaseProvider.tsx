"use client"

import { ReactNode, useState } from "react";
import { Database } from "@/types_supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
    children: ReactNode
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ 
    children 
}) => {
    const [supabaseClient] = useState(() => 
        createClientComponentClient<Database>()
    );
    
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
};

export default SupabaseProvider;