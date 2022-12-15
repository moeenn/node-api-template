import { Service } from "typedi"
import { Database } from "@/Vendor/Entities/Database"
import { User } from "@prisma/client"
import { NotFoundException } from "@/Vendor/Exceptions"

@Service()
export class UserService {
  private db: Database

  constructor(db: Database) {
    this.db = db
  }

  /**
   *  get a single user using ID
   *
   */
  public async getUserByID(id: number): Promise<User> {
    const user = await this.db.conn.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw NotFoundException(`user with id ${id} not found`)
    }

    return user
  }
}
