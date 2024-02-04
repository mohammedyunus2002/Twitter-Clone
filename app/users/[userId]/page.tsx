"use client"
import Header from "@/components/Header";
import { usePathname } from 'next/navigation'
import useUser from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";


interface UserViewProps {
    name: string;
  }

const UserView = () => {
    const pathname = usePathname()
    const userId: string | undefined = pathname.split('/').pop() ?? ''; 

    const [user, setUser] = useState<UserViewProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useUser(userId);
            setUser(data);
        }

        fetchData();
    }, []);

    if ( !user) {
        return (
            <div 
            className="
                flex
                justify-center
                items-center
                h-full
            ">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return ( 
        <>
            <Header showBackArrow label={user.name || ''} />
            <UserHero userId={ userId as string} />
            <UserBio userId={ userId as string } />
        </>
     );
}
 
export default UserView;
