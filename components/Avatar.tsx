"use client"
import useUser  from "@/hooks/useUser";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UserViewProps {
    profileImage: string;
  }

interface AvatarProps {
    userId: string,
    isLarge?: boolean,
    hasBorder?: boolean
}

export const Avatar = ({
    userId,
    isLarge,
    hasBorder   
}: AvatarProps) => {
    const [user, setUser] = useState<UserViewProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useUser(userId);
            setUser(data);
        }

        fetchData();
    }, []);
    const router = useRouter();

    const onClick= useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;
        router.push(url);
    }, [router, userId])
    return (
        <div className={`
            ${hasBorder ? 'border-4 border-black' : ''}
            ${isLarge ? 'h-32' : 'h-12'}
            ${isLarge ? 'w-32' : 'w-12'}
            rounded-full
            hover:opacity-90
            transition
            cursor-pointer
            relative
        `}> 
        <Image
            fill
            style={{
                objectFit: 'cover',
                borderRadius: '100%'
            }}
            alt="Avatar"
            onClick={onClick}
            src={user?.profileImage || '/images/placeholder.png'}
        />
        </div>
    )
}