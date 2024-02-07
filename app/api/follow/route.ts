import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
    try {   
      
      const body = await req.json();
      const userId = body.userId;

      const { currentUser } = await serverAuth();

      if (typeof userId !== 'string') {
        throw new Error('Invalid or missing userId');
      } 

      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      if(!user) {
        throw new Error('Invalid ID');
      }

      let updatedFollowingIds = [...(user.followingIds || [])];

      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: "Someone followed you",
            userId
          }
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true
          }
        });
    } catch (err) {
        console.log(err);
    }

      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          followingIds: updatedFollowingIds
        }
      });
  
      return new Response(JSON.stringify(updatedUser), {
        status: 200
      });

    } catch(err) {
      console.log(err);
      return new Response("Error", {
          status: 400
      });
    }
}

export async function DELETE(req: Request) {
  try {   
      
    const body = await req.json();
    const userId = body.userId;


    const { currentUser } = await serverAuth();

    if (typeof userId !== 'string') {
      throw new Error('Invalid or missing userId');
    } 

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if(!user) {
      throw new Error('Invalid ID');
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200
    });

  } catch(err) {
    console.log(err);
    return new Response("Error", {
        status: 400
    });
  }
}