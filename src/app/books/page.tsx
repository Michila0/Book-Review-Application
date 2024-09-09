"use server"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import db from "@/db/db";

export default async function BookList() {

    const books = await db.book.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            author: true,
            user: true,
            // reviews: true
        },
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {books.map((book) => (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <Link key={book.id} href={`/books/${book.id}`}>
                        <div>
                            {book.coverImage ? (
                                <Image
                                    height='300'
                                    width='300'
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-full h-48 object-cover rounded-lg"

                                />
                            )
                            : (
                                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">No Image Available</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-bold">{book.title}</h3>
                            <p className="text-gray-600">by {book?.author?.name}</p>
                            <p className="mt-2 text-gray-500">{book.discription}</p>
                        </div>
                    </Link>


                </div>
            ))}
        </div>
    );
};
