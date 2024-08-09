import React from 'react';
import {auth, currentUser} from "@clerk/nextjs/server";

export default async function DashboardPag() {
    const { userId } = auth();

    if (!userId) {
        return <div>You are not logged in</div>
    }


    const user = await currentUser()
    console.log(user);

    return (
        <div>dashboard</div>
    );
}