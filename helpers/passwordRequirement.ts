export default function passwordRequirement() {
    return [
        {
            id: 1,
            name: "At least 8 characters",
            predicate: (pwd: string) => pwd.length >= 8,
        },
        {
            id: 2,
            name: "Includes a number",
            predicate: (pwd: string) => /[0-9]/.test(pwd),
        },
        {
            id: 3,
            name: "Includes a special character",
            predicate: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        },
        {
            id: 4,
            name: "Includes an uppercase letter",
            predicate: (pwd: string) => /[A-Z]/.test(pwd),
        },
        {
            id: 5,
            name: "Includes a lowercase letter",
            predicate: (pwd: string) => /[a-z]/.test(pwd),
        },
    ]
}