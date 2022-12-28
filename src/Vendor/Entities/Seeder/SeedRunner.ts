import { Service } from "typedi"
import { PrismaClient } from "@prisma/client"
import { DefaultSeeders } from "@/Application/Seeders/DefaultSeeders"

@Service()
export class SeedRunner {
  private client: PrismaClient

  constructor(private defaultSeeders: DefaultSeeders) {
    this.client = new PrismaClient()
  }

  public async seed() {
    for (const seeder of this.defaultSeeders.seeders) {
      /**
       *  no error handling because we want to stop seeding at the first error
       *
       */
      await seeder(this.client)
    }

    await this.client.$disconnect()
  }
}
