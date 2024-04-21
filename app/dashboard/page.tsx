import React from "react";
import SignOutButton from "./signOutButton";
import Link from "next/link";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <SignOutButton />
            </div>
            <Link
                href={"/user"}
            >
                User page
            </Link>
        </div>
    );
};

export default Dashboard;
