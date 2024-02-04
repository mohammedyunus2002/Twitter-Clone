import serverAuth from '@/libs/serverAuth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { currentUser } = await serverAuth();
    
        return NextResponse.json({
            currentUser,
            status: 200,
        });

      } catch (error) {
        console.log(error);
        return new NextResponse(
        JSON.stringify({ status: "fail", message: "You are not logged in" }),
        { status: 401 }
        );      
    }
}
