import prisma from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id; // Extract the id directly from params

    if (!userId || typeof userId !== "string") {
      throw new Error('Invalid ID');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId
        }
      }
    });

    return new Response(JSON.stringify({ ...existingUser, followersCount }));

  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 400
    });
  }
}
