import { Seeder } from "@/vendor/entities/seeder"
import { rolesSeeder } from "./rolesSeeder"
import { adminSeeder } from "./adminSeeder"
import { usersSeeder } from "./usersSeeder"

/**
 *  register all enabled seeders here
 *
 */
export const defaultSeeders: Seeder[] = [rolesSeeder, adminSeeder, usersSeeder]
