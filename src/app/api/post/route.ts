import {NextRequest, NextResponse} from "next/server";
import db from "@/db/db";
import {auth} from "@clerk/nextjs/server";


export async function POST(req: NextRequest) {
    const authData = await auth()
    const userId = authData.userId as string | undefined;
    try {


        if (!userId) {
            return NextResponse.json({ message: 'User not found!' }, { status: 404 });
        }


        const { title, author, discription, coverImage} = await req.json();

        if (!title || !author || !discription) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        const newPost = await db.book.create({
            data: {
                title,
                author,
                discription,
                coverImage, //'/images/great-gatsby.jpeg',//coverImage || null,

            }
        });
        console.log('New post created: ', newPost)
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        console.log('Error creating new post: ', error)
        return NextResponse.json({message: 'Something went wrong'}, {status:500})
    }
}

export async function GET() {
    try {
        const authData = await auth();
        const userId = authData.userId as string | undefined;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const posts = await db.book.findMany({
            where: {
                userId
            },
        });
        if (posts.length === 0) {
            return NextResponse.json({ message: "No books found", posts: [] }, { status: 200 });
        }

        return NextResponse.json({posts}, {status: 200});
    } catch (error) {
        console.log("ERROR GETTING TASKS: ", error);
        return NextResponse.json({ error: "Error updating task", status: 500 });
    }
}