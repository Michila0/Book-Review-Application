import {SignUp} from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className='flex items-center justify-center flex-col gap-10'>
            <h1 className='text-4xl font-bold mt-20'>This sign up page</h1>
            <SignUp/>
        </div>
    )
}