"use client"

import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Notifications = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (!session) {
        router.push('/');

        return null;

    }

    return ( 
        <>
            <Header label="Notifications" showBackArrow />
            <NotificationsFeed />
        </>
     );
}
export default Notifications;