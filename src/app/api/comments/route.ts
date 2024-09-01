import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import db from "@/db/db";

export async function POST(req: NextRequest) {
    const authData = await auth()
    const userId = authData.userId as string | undefined;
    try {


        if (!userId) {
            return NextResponse.json({ message: 'User not found!' }, { status: 404 });
        }


        const { bookId, content, rating} = await req.json();

        if (!bookId || !content || rating === undefined) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        // Create a new book post
        const newPost = await db.review.create({
            data: {
                bookId,
                content,
                rating,
                book: {
                    connect: {
                        id: bookId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },

            }
        });
        console.log('New post created: ', newPost)
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        console.log('Error creating new post: ', error)
        return NextResponse.json({message: 'Something went wrong'}, {status:500})
    }
}

export async function GET(req: NextRequest) {
    const authData = await auth();
    const userId = authData.userId as string | undefined;

    try {
        if (!userId) {
            return NextResponse.json({ message: 'User not found!' }, { status: 404 });
        }

        const { searchParams } = new URL(req.url);
        const reviewId = searchParams.get('reviewId');
        const bookId = searchParams.get('bookId');

        if (!reviewId && !bookId) {
            return NextResponse.json({
                error: "Missing required query parameters",
                status: 400,
            });
        }

        let reviews;
        if (reviewId) {
            // Fetch a single review by its ID
            reviews = await db.review.findUnique({
                where: { id: reviewId },
                include: {
                    book: true,
                    user: true,
                },
            });
        } else if (bookId) {
            // Fetch all reviews for a specific book
            reviews = await db.review.findMany({
                where: { bookId },
                include: {
                    book: true,
                    user: true,
                },
            });
        }

        if (!reviews) {
            return NextResponse.json({ message: 'Review(s) not found!' }, { status: 404 });
        }

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.log('Error fetching review(s): ', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}