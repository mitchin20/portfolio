export const getLocalStorage = (key: string, initialValue: any) => {
    if (typeof window === "undefined") {
        return initialValue;
    }

    try {
        const storedValue = localStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
        console.error('Error getting localStorage key "' + key + '":', error);
        return initialValue;
    }
}

export const setLocalStorage = (key: string, value: any) => {
    if (typeof window === "undefined") {
        return
    }

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting localStorage key "' + key + '":', error);
    }
}

export const removeItem = (key: string) => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing localStorage key "' + key + '":', error);
    }
}