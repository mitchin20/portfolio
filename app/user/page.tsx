import React from "react";
import UserProfile from "../components/userProfile/UserProfile";
import Link from "next/link";

const Users = () => {
    return (
        <div>
            Users Page
            <UserProfile />
            <Link href={"/dashboard"}>
                Dashboard
            </Link>
        </div>
    )
}

export default Users;