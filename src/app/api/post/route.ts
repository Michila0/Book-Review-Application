import {NextRequest, NextResponse} from "next/server";
import db from "@/db/db";
import {clerkClient, getAuth} from "@clerk/nextjs/server";


export async function POST(req: NextRequest) {
    const { userId, sessionId } = await getAuth(req);
    console.log('sessionId: ', sessionId)

    if (!userId) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
    }

    const user =  await clerkClient().sessions.getSession(userId)

    try {
        if (!user) {
            return NextResponse.json({message:'Not Authenticated!'}, {status: 401})
        }

        const { title, author, discription, coverImage} = await req.json();

        const newPost = await db.book.create({
            data: {
                title,
                author,
                discription,
                coverImage: coverImage || null,
                userId: user.id

            }
        });
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        console.log('Error creating new post: ', error)
        return NextResponse.json({message: 'Something went wrong'}, {status:500})
    }
}