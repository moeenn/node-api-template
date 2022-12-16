import { Service } from "typedi"
import { Database } from "@/Vendor/Entities/Database"

@Service()
export class UserRoleService {
  constructor(private db: Database) {}
}
