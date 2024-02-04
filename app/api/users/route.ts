import prisma from "@/libs/prismadb"
export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return new Response(JSON.stringify(users), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 400
        });
    }
}