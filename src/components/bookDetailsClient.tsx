"use client";

import React, { useState } from 'react';
import Reviews from "@/components/reviews";
import FormReview from "@/components/form-review";
import {Review} from "@prisma/client";

interface BookDetailsClientProps {
    bookId: string;
}

export default function BookDetailsClient({ bookId }: BookDetailsClientProps) {
    const [refreshReviews, setRefreshReviews] = useState(false);

    const handleReviewSubmit = () => {
        // Toggle refreshReviews state to trigger re-fetching reviews
        setRefreshReviews((prev) => !prev);
    };

    return (
        <div>
            <Reviews bookId={bookId} refreshReviews={refreshReviews} />
            <FormReview bookId={bookId} onReviewSubmit={handleReviewSubmit} />
        </div>
    );
}
