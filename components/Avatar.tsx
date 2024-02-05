"use client"

import fetcher from "@/libs/fetcher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useSWR from "swr";


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
    const { data: user } = useSWR(`/api/users/${userId}`, fetcher);

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