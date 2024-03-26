import { PrismaClient } from "@prisma/client";

// Prevent multiple instance in Dev
declare global {
    var prisma: PrismaClient | undefined;
}

// Helpful for debugging during development
const prisma = global.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});

// The conditional assignment to global.prisma ensures that in development, where hot reloading might create multiple instances, you still only have one instance of Prisma Client
if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma
}

export default prisma;