import {auth, getAuth} from "@clerk/nextjs/server";
import {clerkClient} from "@clerk/nextjs/server";

export async function getCurrentUser() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    try {
        const session = await clerkClient().sessions.getSession(userId);
        return session;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}


// import {getServerSession} from "next-auth";
// import {authOptions} from "@/lib/auth";
//
//
// export async function getCurrentUser() {
//     const session = await getServerSession(authOptions);
//     return session?.user;
// }