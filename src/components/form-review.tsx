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
    const router = useRouter();
    const data = useSession();

    const handleReviewChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReview(e.target.value);
    }

    const handleSubmitReview = async () => {
        if (review.trim() !== '') {
            try {
                const newComment = await axios.post('/api/comments', {
                    bookId,
                    text: review,
                })
                if (newComment.status === 200) {
                    router.refresh()
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div className='mt-4'>
                <label
                    htmlFor='comment'
                    className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Add Review
                </label>
                <input
                    value={review}
                    onChange={handleReviewChange}
                    type='text'
                    className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    name='comment'

                />
                <Button
                    // disabled={!data?.user?.email}
                    onClick={handleSubmitReview}
                    //className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400'
                >
                    Submit Review
                </Button>
            </div>
        </div>
    );
}