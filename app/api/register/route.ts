import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return new Response("Error", {
            status: 405
        });
    }

    try {
        const { email, username, name, password } = await req.json();
        const names = JSON.stringify(name);
        console.log(names)
        

        const hashedPassword = await bcrypt.hash(password, 12);
    
        const user = await prisma.user.create({
          data: {
            email,
            username,
            name,
            hashedPassword,
          }
        });
    
        return new Response(JSON.stringify(user), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 400
        })      
    }
}