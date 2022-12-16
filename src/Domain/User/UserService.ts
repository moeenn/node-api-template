import { Service } from "typedi"
import { User } from "."
import { Database } from "@/Vendor/Entities/Database"
import { NotFoundException } from "@/Vendor/Exceptions"
import { ICreateUserArgs } from "./UserService.types"

@Service()
export class UserService {
  constructor(private db: Database) {}

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

  /**
   *  register a new user with the system
   *
   */
  public async createUser(args: ICreateUserArgs): Promise<User> {
    const user = await this.db.conn.user.create({
      data: {
        name: args.name,
        email: args.email,
        roles: {
          create: args.roles.map((role) => ({
            role_id: role.id,
          })),
        },
      },
    })

    return user
  }
}
