import { useState, useEffect } from "react";

interface UseFetch {
    url: string,
    setLoading: (value: boolean) => void
}

export function useCustomFetch({url, setLoading}: UseFetch): any[] {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            setData(data);
        }

        fetchData();
    }, [url])

    return data;
}