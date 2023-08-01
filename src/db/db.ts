import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | null = null;

export function createPrismaClient() {
    if (!prismaClient) {
        prismaClient = new PrismaClient();
    }
    return prismaClient;
}

export function prisma() {
    if (!prismaClient) {
        prismaClient = createPrismaClient();
    }
    return prismaClient;
}