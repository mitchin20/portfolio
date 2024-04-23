import React from "react";
import Link from "next/link";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href={"/user"}>User page</Link>
        </div>
    );
};

export default Dashboard;
