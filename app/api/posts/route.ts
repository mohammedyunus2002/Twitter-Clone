import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
    try {
        const { currentUser } = await serverAuth();
        const response = await req.json();
        const body = response.body;

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        });

        return new Response(JSON.stringify(post), {
            status: 200
        });
        
    } catch (err) {
        console.log(err);
        return new Response("Error", {
            status: 400
        })
    }
}

export async function GET(req: Request) {
    try {
        const { currentUser } = await serverAuth();

        const  userId  = currentUser.id || '';

        let posts;

        if(userId && userId === 'string') {
            posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        }


        return new Response(JSON.stringify(posts), {
            status: 200
        });
        
    } catch (err) {
        console.log(err);
        return new Response("Error", {
            status: 400
        })
    }
}