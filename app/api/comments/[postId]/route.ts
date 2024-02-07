import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { postId: string } }
    ) {
    try {
        const postId = params.postId; 
        console.log(postId);

        const { currentUser } = await serverAuth();
        const response = await req.json();
        const body = response.body;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }


        const comment = await prisma.comment.create({
            data: {
              body,
              userId: currentUser.id,
              postId
            }
          });

          try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                }
            });

            if(post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: "Someone replied on your tweet!",
                        userId: post.userId
                    }
                });

                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }

          } catch (err) {
            console.log(err);
          }

        return new Response(JSON.stringify(comment), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 400
        });
    }
}

export async function GET(req: Request) {
    return new Response("Assalamualaikum");
}