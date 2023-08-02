"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.createPrismaClient = void 0;
const client_1 = require("@prisma/client");
let prismaClient = null;
function createPrismaClient() {
    if (!prismaClient) {
        prismaClient = new client_1.PrismaClient();
    }
    return prismaClient;
}
exports.createPrismaClient = createPrismaClient;
function prisma() {
    if (!prismaClient) {
        prismaClient = createPrismaClient();
    }
    return prismaClient;
}
exports.prisma = prisma;
