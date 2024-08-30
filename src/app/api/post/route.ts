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


        const { title, author, discription} = await req.json();

        if (!title || !author || !discription ) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }


        // Fetch the author object based on the author name
        const authorRecord = await db.author.findFirst({
            where: {
                name: author
            }
        });

        // If author does not exist, create one
        let authorId;
        if (!authorRecord) {
            const newAuthor = await db.author.create({
                data: {
                    name: author,
                },
            });
            authorId = newAuthor.id;
        } else {
            authorId = authorRecord.id;
        }

        // Create a new book post
        const newPost = await db.book.create({
            data: {
                title,
                authorId,
                discription,
               //coverImage: coverImage || null, //'/images/great-gatsby.jpeg',//coverImage || null,

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