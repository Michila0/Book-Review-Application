import {getAuth} from "@clerk/nextjs/server";
import {clerkClient} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";

export async function getCurrentUser(req: NextRequest) {
    const { userId } = await getAuth(req);

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