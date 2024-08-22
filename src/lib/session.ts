import {auth} from "@clerk/nextjs/server";
import {clerkClient} from "@clerk/nextjs/server";

export async function getCurrentUser() {
    const { userId } = auth();
    if (!userId) return null;

    const user = await clerkClient.users.getUser(userId);
    return user;
}


// import {getServerSession} from "next-auth";
// import {authOptions} from "@/lib/auth";
//
//
// export async function getCurrentUser() {
//     const session = await getServerSession(authOptions);
//     return session?.user;
// }