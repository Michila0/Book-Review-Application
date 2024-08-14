import React from 'react';
import Link from "next/link";
import {auth} from "@clerk/nextjs/server";
import {UserButton} from "@clerk/nextjs";

export default async function Header() {
    const {userId} = await auth()

    return (
        <div className='bg-gray-600 text-neutral-100'>
            <div className="container mx-auto flex items-center justify-between py-4">
                <Link href='/'>Home</Link>
                <div>

                    {userId
                        ? (
                            <div className='flex gap-5 items-center'>
                                <Link href='/dashboard'>Dashboard</Link>
                                <UserButton afterSignOutUrl='/'/>
                            </div>
                        )
                        : (
                            <div className='flex gap-5 items-center'>
                                <Link href='/sign-up'>Sign Up</Link>
                                <Link href='/sign-in'>Sign In</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}