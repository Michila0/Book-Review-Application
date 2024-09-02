"use client"
import React, {ChangeEvent, useState} from 'react';
import axios from "axios";
import {useSession} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

interface FormReviewProps {
    bookId: string
}

export default function FormReview({bookId}: FormReviewProps) {
    const [review, setReview] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const router = useRouter();
    const {session} = useSession();

    const handleReviewChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReview(e.target.value);
    }

    const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRating(parseInt(e.target.value)); // Assuming you have a rating input
    }

    const handleSubmitReview = async () => {
        if (!review.trim()) return;
            try {
                if (!session) {
                    console.error("User session not found.");
                    return;
                }

                const token = await session.getToken();
                const newComment = await axios.post('/api/comments', {
                    bookId,
                    content: review,
                    rating,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log('newComment: ', newComment.data)

                if (newComment.status === 200) {
                    router.refresh()
                }
            } catch (error: any) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Server responded with:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error in request setup:', error.message);
                }
            }

    }

    return (
        <div>
            <div className='mt-4'>
                <label
                    htmlFor='content'
                    className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Add Review
                </label>
                <input
                    value={review}
                    onChange={handleReviewChange}
                    type='text'
                    className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    name='content'
                    id='content'
                    placeholder='What do you feel?'

                />
                <label
                    htmlFor='rating'
                    className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Rating
                </label>
                <input
                    value={rating}
                    onChange={handleRatingChange}
                    type='number'
                    min='0'
                    max='5'
                    className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    name='rating'
                    id='rating'
                    placeholder='Rate the book out of 5'
                />
                <Button
                    disabled={!session?.user.id}
                    onClick={handleSubmitReview}
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400'
                >
                    Submit Review
                </Button>
            </div>
        </div>
    );
}