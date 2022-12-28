import { Service } from "typedi"
import { Seeder } from "@/Vendor/Entities/Seeder"
import { RolesSeeder } from "./RolesSeeder"
import { AdminSeeder } from "./AdminSeeder"
import { UsersSeeder } from "./UsersSeeder"

@Service()
export class DefaultSeeders {
  public readonly seeders: Seeder[]

  constructor() {
    /**
     *  register all enabled seeders here
     *
     */
    this.seeders = [RolesSeeder, AdminSeeder, UsersSeeder]
  }
}
