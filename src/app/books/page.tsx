"use server"
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import db from "@/db/db";

// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     coverImage: string;
//     description: string;
// };

// const books: Book[] = [
//     {
//         id: 1,
//         title: 'The Great Gatsby',
//         author: 'F. Scott Fitzgerald',
//         coverImage: '/images/great-gatsby.jpeg',
//         description: 'A novel about the American dream...',
//     },
//     {
//         id: 2,
//         title: '1984',
//         author: 'George Orwell',
//         coverImage: '/images/1984.jpeg',
//         description: 'A dystopian novel set in a totalitarian society...',
//     },
// ];



export default async function BookList() {

    const books = await db.book.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: true,
            // user: true,
            // reviews: true
        },
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {books.map((book) => (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <Link key={book.id} href={`/books/${book.id}`}>
                        <Image
                            height='300'
                            width='300'
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
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
