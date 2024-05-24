export const getSessionStorage = (key: string, initialValue: any) => {
    if (typeof window === "undefined") {
        return initialValue;
    }

    try {
        const storedValue = sessionStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
        console.error('Error getting localStorage key "' + key + '":', error);
        return initialValue;
    }
}

export const setSessionStorage = (key: string, value: any) => {
    if (typeof window === "undefined") {
        return
    }

    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting localStorage key "' + key + '":', error);
    }
}

export const removeSessionStorage = (key: string) => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        const session = sessionStorage.removeItem(key);
        console.log("User Session Storage: ", session);
    } catch (error) {
        console.error('Error removing localStorage key "' + key + '":', error);
    }
}