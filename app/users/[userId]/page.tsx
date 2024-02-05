"use client"
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import { ClipLoader } from "react-spinners";
import { usePathname } from 'next/navigation'
import useUser from "@/hooks/useUser";

const UserView = () => {
    const pathname = usePathname()
    const userId: string | undefined = pathname.split('/').pop() ?? ''; 

    const { data: user } = useUser(userId);


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
            <PostFeed userId={userId as string} />
        </>
     );
}
 
export default UserView;
