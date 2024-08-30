"use client"

import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {FormData as PostFormData} from "@/types/post";
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

    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        author: '',
        discription: '',
        coverImage: ''
    })

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                author: book.authorId || '',
                discription: book.discription || '',
                coverImage: book.coverImage || '',
            });
            setImagePreview(book.coverImage || null)
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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            let imageUrl = formData.coverImage;
            console.log('😎: ', imageUrl)

            if (selectedImage) {
                const formDataImage = new FormData();
                formDataImage.append('file', selectedImage);

                // Add your image upload endpoint here
                const uploadResponse = await axios.post('/api/upload', formDataImage,
                    // headers: {
                    //     'Content-Type': 'multipart/form-data',
                    // },
                );
                imageUrl = uploadResponse.data.url;
                //return imageUrl
            }



            const response =  await axios.post('api/post', {...formData, coverImage: imageUrl});
            console.log('Response Data:', response)
            if (response.status === 200) {

                // router.push(`/books/${response.data.newPost.id}`)

                const newPost = response.data.newPost;
                if (newPost && newPost.id) {
                    router.push(`/books/${newPost.id}`);
                } else {
                    console.error('New post data is missing or does not contain an id');
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
                        <Input type='file' name='image' id='image' onChange={handleImageChange}/>
                        {imagePreview != null && (
                            <Image
                                src={imagePreview}
                                alt='Image Preview'
                                height='100'
                                width='100'
                            />
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