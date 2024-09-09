// /lib/bookService.ts

export type Book = {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    description: string;
    reviews: Review[];
};

export type Review = {
    reviewer: string;
    comment: string;
};

export const getBookDetails = async (id: string): Promise<Book> => {
    // Mock data, replace with your actual API call
    return {
        id,
        title: 'Sample Book Title',
        author: 'John Doe',
        coverUrl: '/images/sample-book.jpg',
        description: 'This is a description of the book...',
        reviews: [
            { reviewer: 'Alice', comment: 'Great read!' },
            { reviewer: 'Bob', comment: 'Highly recommend.' },
        ],
    }
};
