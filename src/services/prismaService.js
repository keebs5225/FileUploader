//prismaService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  // Initialize Prisma client

module.exports = prisma;  // Export Prisma client for use in controllers
