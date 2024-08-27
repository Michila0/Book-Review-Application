// "use client";
//
// import { useRouter, useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { getBookDetails, Book } from "@/lib/BookService";
//
// const BookDetailPage = () => {
//     const router = useRouter();
//     const params = useParams();
//     const [book, setBook] = useState<Book | null>(null);
//
//     useEffect(() => {
//         const id = params?.id;
//         if (id) {
//             getBookDetails(`/books/${id}`)
//                 .then(data => setBook(data));
//         }
//     }, [params]);
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
//                 {book.reviews.map((review, index) => (
//                     <li key={index} className="border-b py-2">
//                         <p className="font-semibold">{review.reviewer}</p>
//                         <p>{review.comment}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default BookDetailPage;
//


import React from 'react';
import db from "@/db/db";
import Reviews from "@/components/reviews";
import FormReview from "@/components/form-review";

interface BookDetailPageProps {
    params: {
        id: string;
    }
}

export default async function BookDetailsPage({params}: BookDetailPageProps) {

    // const [book, setBook] = useState<any>(null);
    //
    // const [loading, setLoading] = useState<boolean>(true);
    //
    // useEffect(() => {
    //     const fetchBookDetails = async () => {
    //         try {
    //             const response = await axios.get(`/api/post/${params.id}`);
    //             setBook(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching book details:', error);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchBookDetails();
    // }, [params.id]);
    // if (loading) {
    //     return <div>Loading...</div>;
    //
    // }
    // if (!book) {
    //     return <div>Book not found</div>;
    //
    // }
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
            <img src={book?.coverImage || '/path/to/placeholder-image.jpg'}
                 alt={book?.coverImage || 'Book Cover'}
                 className="w-64 h-auto mb-4"/>
            <div className="mt-4">{book?.discription}</div>

            <Reviews bookId={params.id}/>
            <FormReview bookId={params.id}/>
        </div>
    );
}
