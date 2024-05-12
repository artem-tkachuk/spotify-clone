"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import uniqid from "uniqid";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter()

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
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                throw new Error("Missing fields for uploading a song!");
                return;
            }

            const songUniqueID = uniqid();

            // Upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from("songs")
                .upload(
                    `song-${values.title}-${songUniqueID}`, 
                    songFile, 
                    {
                        cacheControl: "3600",
                        upsert: false,
                    }
                );

            if (songError) {
                setIsLoading(false);
                return toast.error("An error occurred while uploading the song");
            }

            // Upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from("images")
                .upload(
                    `image-${values.title}-${songUniqueID}`, 
                    imageFile, 
                    {
                        cacheControl: "3600",
                        upsert: false,
                    }
                );

            if (imageError) {
                setIsLoading(false);
                return toast.error("An error occurred while uploading the image for the song");
            }

            // Insert song into database
            // TODO recreate types because of author -> artist change

            const {
                error: supabaseSongRecordCreationError,
            } = await supabaseClient
                .from("songs")
                .insert({
                    user_id: user.id,
                    title: values.title,
                    artist: values.artist,
                    image_path: imageData.path,
                    song_path: songData.path,
                })

            if (supabaseSongRecordCreationError) {
                return toast.error(supabaseSongRecordCreationError.message);
            }

            // Success
            router.refresh();
            setIsLoading(false);
            toast.success("Song uploaded successfully!");
            reset(); // Reset the form
            uploadModal.onClose();
        } catch (error) {
            toast.error("An error occurred while uploading the song");
        } finally {
            setIsLoading(false);
        }
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
                className="
                    flex
                    flex-col
                    gap-y-4
                "
            >
                <Input
                    id="title"
                    type="text"
                    disabled={isLoading}
                    {...register("title", {
                        required: true,
                    })}
                    placeholder="Song title"
                />

                <Input
                    id="artist"
                    type="text"
                    disabled={isLoading}
                    {...register("artist", {
                        required: true,
                    })}
                    placeholder="Song artist"
                />

                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>

                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register("song", {
                            required: true,
                        })}
                    />
                </div>

                <div>
                    <div className="pb-1">
                        Select a song cover image
                    </div>

                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", {
                            required: true,
                        })}
                    />
                </div>

                <Button
                    disabled={isLoading}
                    type="submit"
                >
                    Create
                </Button>
            </form>
        </Modal>
    );
}

export default UploadModal;