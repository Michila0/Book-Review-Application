import {auth, currentUser} from "@clerk/nextjs/server";


export default async function DashboardPag() {
    const { userId } = await auth();
    console.log('User Id: ',userId)

    // if (userId === null) {
    //     return <div>You are not logged in</div>
    // }

    console.log(<div>log in user</div>)


    return (
        <div>dashboard</div>
    );
}