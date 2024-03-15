import React from "react";

const URL = 'https://jsonplaceholder.typicode.com/users'

interface User {
    id: number;
    name: string;
}

const Users = async () => {
    const res = await fetch(URL, {
        cache: 'no-store'
    });
    const users: User[] = await res.json();
    return (
        <div>
            Users Page

            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users;