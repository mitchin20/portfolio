type ValidationEmail = {
    isValid: boolean;
    message: string;
};

// Function to validate an email address
export default function validateEmail(email: string): ValidationEmail {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return { isValid: true, message: 'Email is valid.' };
    } else {
        return { isValid: false, message: 'Email is not valid.' };
    }
}