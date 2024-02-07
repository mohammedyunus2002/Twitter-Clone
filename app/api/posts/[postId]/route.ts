import prisma from "@/libs/prismadb";
export async function GET(
    req: Request,
    { params }: { params: { postId: string } }
) {
    try {
        const postId  = params.postId;

        if(!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include :{
                user:  true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            }
        });

        return new Response(JSON.stringify(post), {
            status: 200
        });

    } catch (err) {
        console.log(err);
        return new Response("Error", {
            status: 400
        });
    }
}