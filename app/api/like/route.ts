import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
    try {
        const response = await req.json();
        const postId = response.postId;

        const currentUser = await serverAuth();

        if(!postId || typeof postId !== "string") {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if(!post) {
            throw new Error('Invalid ID');
        }

        let updatedLikeIds = [...(post.likedIds || [])];

        updatedLikeIds.push(currentUser?.currentUser?.id);

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                }
            });

            if(post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: "Someone liked your tweet",
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

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            }, 
            data: {
                likedIds: updatedLikeIds
            }
        });

        return new Response(JSON.stringify(updatedPost), {
            status: 200
        });

    } catch (err) {
        console.log(err);
        return new Response("Error", {
            status: 400
        });
    }
}

export async function DELETE(req: Request) {
    try {
        const response = await req.json();
        const postId = response.postId;

        const currentUser = await serverAuth();

        if(!postId || typeof postId !== "string") {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if(!post) {
            throw new Error('Invalid ID');
        }

        let updatedLikeIds = [...(post.likedIds || [])];

        updatedLikeIds = updatedLikeIds
            .filter((likeID) => likeID !== currentUser.currentUser.id);

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            }, 
            data: {
                likedIds: updatedLikeIds
            }
        });

        return new Response(JSON.stringify(updatedPost), {
            status: 200
        });

    } catch (err) {
        console.log(err);
        return new Response("Error", {
            status: 400
        });
    }
}