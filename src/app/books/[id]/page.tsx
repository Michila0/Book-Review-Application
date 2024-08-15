// "use client"
//
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import {getBookDetails, Book} from "@/lib/BookService";
// // import {Book} from "@prisma/client";
//
// const BookDetailPage = () => {
//     const router = useRouter();
//     // const { id } = router.query;
//     const [id, setId] = useState<string | undefined>(undefined);
//     const [book, setBook] = useState<Book | null>(null);
//
//     useEffect(() => {
//         // Extract the 'id' from 'router.query' after the component mounts
//         if (router && router.query) {
//             setId(router.query.id as string);
//         }
//     }, [router]);
//
//     useEffect(() => {
//         // Fetch the book details using the book ID
//         if (id) {
//             getBookDetails(`/books/${id}`)
//                 .then(response => response.json())
//                 .then(data => setBook(data));
//         }
//     }, [id]);
//
//     if (!book) {
//         return <p>Loading...</p>;
//     }
//
//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
//             <p className="text-gray-600 mb-4">{book.author}</p>
//             <img src={book.coverUrl} alt={book.title} className="w-64 h-auto mb-4" />
//             <p className="text-gray-800">{book.description}</p>
//             <h2 className="text-2xl font-semibold mt-8 mb-4">Reviews</h2>
//             <ul>
//                 {book.reviews.map((review) => (
//                     <li key={review.id} className="border-b py-2">
//                         <p className="font-semibold">{review.reviewerName}</p>
//                         <p>{review.comment}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default BookDetailPage;

"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookDetails, Book } from "@/lib/BookService";
// import { Book } from "@prisma/client";

const BookDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const id = params?.id;
        if (id) {
            getBookDetails(`/books/${id}`)
                .then(data => setBook(data));
        }
    }, [params]);

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-gray-600 mb-4">{book.author}</p>
            <img src={book.coverUrl} alt={book.title} className="w-64 h-auto mb-4" />
            <p className="text-gray-800">{book.description}</p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Reviews</h2>
            <ul>
                {book.reviews.map((review, index) => (
                    <li key={index} className="border-b py-2">
                        <p className="font-semibold">{review.reviewer}</p>
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookDetailPage;


