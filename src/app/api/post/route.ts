import {getCurrentUser} from "@/lib/session";
import {NextResponse} from "next/server";
import db from "@/db/db";

export async function POST(req: Request) {
    const user = await getCurrentUser()

    try {
        if (!user?.emailAddresses) {
            return NextResponse.json({message:'Not Authenticated!'}, {status: 401})
        }

        const { title, author, discription, coverImage} = await req.json();

        const newPost = await db.book.create({
            data: {
                title,
                author,
                discription,
                coverImage,
            }
        });
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Something went wrong'}, {status:500})
    }
}