import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

async function getEmployees() {
    const employees = await prisma.employee.findMany();

    return employees;
}

export async function GET(req: Request) {
    try {

        const employees = await getEmployees();

        return NextResponse.json({
            employees,
            message: "Successfully fetch all employees"
        })
    } catch (error) {
        console.error("Failed to fetch employee data: ", error);
        return NextResponse.json(
            {
                employee: null,
                message: "Failed to fetch employee data!"
            },
            {
                status: 409
            }
        )
    }
}