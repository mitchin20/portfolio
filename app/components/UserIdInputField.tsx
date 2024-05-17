import React from "react";
import { useSearchParams } from "next/navigation";

const UserIdInputField = () => {
    const searchParams = useSearchParams();
    const params = searchParams.get("userId") ?? null;
    const userId = Number(params);

    return (
        <div>
            <input
                id="encodedData"
                name="encodedData"
                type="hidden"
                value={userId}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    );
};

export default UserIdInputField