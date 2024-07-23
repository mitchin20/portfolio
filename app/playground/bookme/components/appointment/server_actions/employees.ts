"use server";

export async function getEmployees() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/employees`)

    const json = await response.json();

    if (response.ok) {
        return {
            success: true,
            message: json.message,
            employees: json.employees
        }
    } else {
        return {
            success: false,
            message: json.message,
            employees: null
        }
    }
}