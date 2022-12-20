import { Service } from "typedi"
import { PrismaClient } from "@prisma/client"

@Service()
export class Database {
  public conn: PrismaClient

  constructor() {
    this.conn = new PrismaClient()
  }

  public async disconnect(): Promise<void> {
    return this.conn.$disconnect()
  }
}
