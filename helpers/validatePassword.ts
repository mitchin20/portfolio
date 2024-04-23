type ValidationPassword = {
    isValid: boolean;
    message: string;
};

export default function validatePassword(password: string): ValidationPassword {

    // Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and to have a length of 8 to 20 characters

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (passwordRegex.test(password)) {
        return { isValid: true, message: 'Password is valid.' };
    } else {
        return { isValid: false, message: 'Password must be at least 8 characters long and include at least one letter and one number.' };
    }
}