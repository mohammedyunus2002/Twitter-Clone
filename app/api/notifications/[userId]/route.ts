import prisma from "@/libs/prismadb";
export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
    ) {
    try {
        const userId = params.userId;
        
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
          }
      
          const notifications = await prisma.notification.findMany({
            where: {
              userId,
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
      
          await prisma.user.update({
            where: {
              id: userId
            },
            data: {
              hasNotification: false,
            }
          });

        return new Response(JSON.stringify(notifications), {
            status: 200,
        });

    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 400
        });
    }   
}