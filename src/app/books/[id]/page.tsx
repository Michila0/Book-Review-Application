import React from 'react';
import db from "@/db/db";
import Reviews from "@/components/reviews";
import FormReview from "@/components/form-review";
import Image from "next/image";

interface BookDetailPageProps {
    params: {
        id: string;
    }
}

export default async function BookDetailsPage({params}: BookDetailPageProps) {
    const book = await db.book.findFirst({
        where: {
            id: params.id
        },
        include: {
            author: true
        }
    })


    return (
        <div className='max-w-4xl mx-auto py-8'>
            <h1 className='text-3xl font-bold'>{book?.title}</h1>
            <p>Written by: {book?.author?.name}</p>
            {book?.coverImage ? (
                <Image
                    src={book.coverImage.startsWith('/uploads/') ? book.coverImage : `/uploads/${book.coverImage}`}
                    alt={book.title}
                    width={256}
                    height={384}
                    className="w-64 h-auto mb-4"

                />
            )
            : (<div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                </div>)
            }
            <div className="mt-4">{book?.discription}</div>

            <Reviews bookId={params.id}/>
            <FormReview bookId={params.id}/>
        </div>
    );
}
