interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export const currentUser = async (): Promise<User | null> => {
    try {
        const URL = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/user`;
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data.user;
    } catch (error) {
        return null;
    }
}