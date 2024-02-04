import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb';

const serverAuth = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const userEmail = session.user.email;


    const currentUser = await prisma.user.findUnique({
        where: {
          email: userEmail,
        }
      });

    if (!currentUser) {
      throw new Error('User not found in Prisma');
    }

    return { currentUser }; 
}

export default serverAuth;