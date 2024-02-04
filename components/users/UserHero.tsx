"use client"
import Image from "next/image";
import useUser from "@/hooks/useUser";
import { Avatar } from "../Avatar";
import { useEffect, useState } from "react";

interface UserHeroProps {
    userId: string;
}

interface UserViewProps {
    coverImage: string;
  }

export const UserHero =  ({
    userId
}: UserHeroProps) => {
    const [user, setUser] = useState<UserViewProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useUser(userId);
            setUser(data);
        }

        fetchData();
    }, []);

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