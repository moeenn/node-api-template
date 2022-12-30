import { PrismaClient } from "@prisma/client"
export type Seeder = (client: PrismaClient) => Promise<void>
