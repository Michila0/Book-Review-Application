import {NextRequest, NextResponse} from "next/server";
import db from "@/db/db";
import {getCurrentUser} from "@/lib/session";
import {auth} from "@clerk/nextjs/server";


export async function POST(req: NextRequest) {
console.log("requ-",req.body)
    const user = await auth()
    try {


        if (!user) {
            return NextResponse.json({ message: 'User not found!' }, { status: 404 });
        }


        const { title, authorId, discription, coverImage} = await req.json();

        if (!title || !authorId || !discription || !coverImage) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        const newPost = await db.book.create({
            data: {
                title,
                authorId,
                discription,
                coverImage: coverImage || null, //'/images/great-gatsby.jpeg',//coverImage || null,
                userId: user.userId,


            }
        });
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        console.log('Error creating new post: ', error)
        return NextResponse.json({message: 'Something went wrong'}, {status:500})
    }
}

