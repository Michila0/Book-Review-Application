"use client"

import {ChangeEvent, useState} from "react";
import {FormData} from "@/types/post";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import {Book} from "@prisma/client";
import Image from "next/image";



const inputClass = 'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300';

export default function FormNewPost({book}: {book?: Book | null}) {

    const [formData, setFormData] = useState<FormData>({
        title: '',
        author: '',
        description: '',
        coverImage: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <form className='mt-10 text-start max-w-xl mx-auto bg-neutral-200 p-5 rounded'>
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
                            // type='text'
                            className={inputClass}
                            placeholder='Enter the description'
                            name='description'
                            id='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='image'>Image</Label>
                        <Input type='file' name='image' id='image' required={book == null}/>
                        {book != null && (
                            <Image src={book.coverImage} alt='Product Image' height='400' width='400'/>
                        )}
                    </div>
                </div>
                <SubmitButton/>
            </form>
        </>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button type='submit' disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}