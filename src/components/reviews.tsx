// import React from 'react';
// import {format} from "date-fns";
// import db from "@/db/db";
//
// interface ReviewsProps {
//     bookId: string
// }
//
// export default async function Reviews({bookId}: ReviewsProps) {
//
//
//     const reviews = await db.review.findMany({
//         where: {
//             bookId,
//         },
//         include: {
//             user: true,
//         }
//     });
//
//     if (!reviews || reviews.length === 0) {
//         return <div>🔴No reviews yet.</div>;
//     }
//
//     return (
//         <div className='mt-8'>
//             <h2 className="text-2xl font-bold">Reviews </h2>
//             <ul>
//                 {reviews.map((review) => (
//                     <li key={review.id} className='mb-4 bg-slate-300 p-2'>
//                         <div className="flex items-center mb-2">
//                             <div className="text-blue-500 font-bold mr-2">
//                                 {review.user?.name}
//                             </div>
//                             <div className="text-gray-500">{format(review.createdAt, 'MMMM d,yyyy')}</div>
//                         </div>
//                         <p>{review.content}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }



"use client"
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {Review} from "@prisma/client";

interface ReviewWithUser extends Review {
    user: {
        name: string;
    } | null;
}

interface ReviewsProps {
    bookId: string;
}

export default function Reviews({ bookId }: ReviewsProps) {
    const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/comments?bookId=${bookId}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error("API did not return an array:", data);
                    setReviews([]);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setReviews([]); // Fallback to an empty array in case of error
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [bookId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (reviews.length === 0) {
        return <div>🔴No reviews yet.</div>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id} className="mb-4 bg-slate-300 p-2">
                        <div className="flex items-center mb-2">
                            <div className="text-blue-500 font-bold mr-2">
                                {review.user?.name || "Anonymous"}
                            </div>
                            <div className="text-gray-500">{format(new Date(review.createdAt), 'MMMM d, yyyy')}</div>
                        </div>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
