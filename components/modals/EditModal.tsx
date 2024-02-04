"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";

interface UserViewProps {
    createdAt: string;
    id: string;
    name: string;
    username: string;
    bio: string;
    followingIds: string;
    followersCount: string;
    profileImage: string,
    coverImage: string
}

const EditModal = () => {
    const [currentUser, setCurrentUser] = useState<UserViewProps | null>(null);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userResponse = await useCurrentUser();
            

            setCurrentUser(userResponse);

        };

        fetchUser();
    }, []);

    useEffect(() => {
        setProfileImage(currentUser?.profileImage ?? '');
        setCoverImage(currentUser?.coverImage ?? '');
        setName(currentUser?.name ?? '');
        setUsername(currentUser?.username ?? '');
        setBio(currentUser?.bio ?? '');
    }, [currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback( async () => {
        try {   
            setIsLoading(true);

            await axios.patch('/api/edit', {
                name, 
                username, 
                bio,
                profileImage,
                coverImage
            });      

            toast.success('Updated');
            editModal.onClose();

        } catch (err) {
            toast.error('Something went wrong');
            setIsLoading(false);
        }
    }, [editModal, name, username, bio, profileImage, coverImage]);


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )
    
    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}        
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}
 
export default EditModal;