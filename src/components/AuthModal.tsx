"use client"

import { 
    useSessionContext, 
    useSupabaseClient 
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Modal from "./Modal";
import { Auth } from "@supabase/auth-ui-react"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();

    return (
        <Modal
            title="Welcome back!"
            description="Log in to your account"
            isOpen
            onChange={() => {}}
        >
            <Auth 
                providers={[
                    'google', 
                    'spotify', 
                    'github'
                ]}
                magicLink
                supabaseClient={supabaseClient}
                theme="dark"
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e',
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
}

export default AuthModal;