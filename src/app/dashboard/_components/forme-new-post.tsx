"use client"

import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {FormData} from "@/types/post";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Book} from "@prisma/client";
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useSession} from "@clerk/nextjs";



const inputClass = 'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300';

export default function FormNewPost({book}: {book?: Book | null}) {

    const [formData, setFormData] = useState<FormData>({
        title: '',
        author: '',
        discription: '',
        coverImage: ''
    })

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                author: book.authorId || '',
                discription: book.discription || '',
                coverImage: book.coverImage || '',
            });
        }
    }, [book]);

    const data = useSession()
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response =  await axios.post('api/post', formData);
            console.log('Response Data:', response)
            if (response.status === 200) {

                // router.push(`/books/${response.data.newPost.id}`)

                const newPost = response.data.newPost;
                if (newPost && newPost.id) {
                    router.push(`/books/${newPost.id}`);
                } else {
                    console.error('New post data is missing or does not contain an id');
                    // Handle this scenario gracefully, e.g., show an error message to the user
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form className='mt-10 text-start max-w-xl mx-auto bg-neutral-200 p-5 rounded' onSubmit={handleSubmit}>
                <div className='mb-4 space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                            type='text'
                            id='title'
                            className={inputClass}
                            placeholder='Enter the title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='author'>Author</Label>
                        <Input
                            type='text'
                            className={inputClass}
                            placeholder='Enter the Author Name'
                            id='author'
                            name='author'
                            value={formData.author}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='title'>Description</Label>
                        <Textarea
                            key='text'
                            className={inputClass}
                            placeholder='Enter the discription'
                            name='discription'
                            id='discription'
                            value={formData.discription}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='image'>Image</Label>
                        <Input type='file' name='image' id='image' required={book == null}/>
                        {book?.coverImage != null && (
                            <Image src={book.coverImage} alt='Product Image' height='400' width='400'/>
                        )}
                    </div>
                </div>
                <Button disabled={!data.session?.user} type='submit'>
                    Submit
                </Button>
            </form>
        </>
    );
}