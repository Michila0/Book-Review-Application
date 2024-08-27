import React from 'react';
import {format} from "date-fns";
import db from "@/db/db";

interface ReviewsProps {
    bookId: string
}

export default async function Reviews({bookId}: ReviewsProps) {

    const reviews = await db.review.findMany({
        where: {
            bookId,
        },
        include: {
            user: true,
        }
    });

    return (
        <div className='mt-8'>
            <h2 className="text-2xl font-bold">Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id} className='mb-4 bg-slate-300 p-2'>
                        <div className="flex items-center mb-2">
                            <div className="text-blue-500 font-bold mr-2">
                                {review.user?.name}
                            </div>
                            <div className="text-gray-500">{format(review.createdAt, 'MMMM d,yyyy')}</div>
                        </div>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}