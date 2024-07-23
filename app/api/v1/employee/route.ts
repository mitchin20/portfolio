import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/client";

interface Employee {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    color: string | null;
    phone: string | null;
    email: string | null;
}

async function getEmployee(id: number) {
    const employee: Employee | null = await prisma.employee.findUnique({
        where: {
            id: id
        }
    })

    return employee || null;
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const employeeId = searchParams.get('employeeId')

        if (!employeeId) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "ID is missing"
            }, {
                status: 409
            })
        }

        const employee = await getEmployee(Number(employeeId));

        if (!employee) {
            return NextResponse.json({
                success: false,
                data: null,
                message: `Failed to fetch employee with ${employeeId}`
            }, {
                status: 409
            })
        }

        return NextResponse.json({
            success: true,
            data: employee,
            message: "Successfully fetching employee data"
        })
    } catch (error) {
        console.error("Failed to fetch employee data: ", error);
        return NextResponse.json({
            success: false,
            data: null,
            message: `Failed to fetch employee data: ${error}`
        }, {
            status: 409
        })
    }
}