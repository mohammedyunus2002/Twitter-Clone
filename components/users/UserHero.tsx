"use client"
import Image from "next/image";
import { Avatar } from "../Avatar";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

interface UserHeroProps {
    userId: string;
}

export const UserHero =  ({
    userId
}: UserHeroProps) => {
    const { data: user } = useSWR(`/api/users/${userId}`, fetcher);


    return ( 
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {user?.coverImage && (
                    <Image 
                        src={user.coverImage}
                        alt="Cover Image"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder  />
                </div>
            </div>
        </div>
     );
}
 
export default UserHero;