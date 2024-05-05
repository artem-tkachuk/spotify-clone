"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "./Modal";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const uploadModal = useUploadModal();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            artist: "",
            title: "",
            album: "",
            genre: "",
            year: "",
            song: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // Upload song to Supabase
    }

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file to your library!"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", {
                        required: true,
                    })}
                    placeholder="Song title"
                />
            </form>
        </Modal>
    );
}

export default UploadModal;