"use client"

import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Notifications = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);

    if (!session) {
        // Don't render anything on the server-side
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