import { Service } from "typedi"
import { User } from "."
import { Database } from "@/Vendor/Entities/Database"
import { NotFoundException } from "@/Vendor/Exceptions"
import { UserWithoutPassword, ICreateUserArgs } from "./UserService.types"
import { Password } from "@/Vendor/Helpers"

@Service()
export class UserService {
  constructor(private db: Database) {}

  /**
   *  get a single user using ID
   *
   */
  public async getUserByID(id: number): Promise<UserWithoutPassword> {
    const user = await this.db.conn.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw NotFoundException(`user with id ${id} not found`)
    }

    return Object.assign(user, { password: undefined })
  }

  /**
   *  get a single user using email
   *
   */
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.db.conn.user.findFirst({
      where: { email },
    })

    if (!user) {
      throw NotFoundException("user not found", { email })
    }

    return user
  }

  /**
   *  register a new user with the system
   *
   */
  public async createUser(args: ICreateUserArgs): Promise<User> {
    /**
     *  all users will be created with an empty password. They will use the
     *  password token to set a password
     */
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

  /**
   *  set password for a user
   *
   */
  public async setUserPassword(user: User, password: string) {
    const hash = await Password.hash(password)

    await this.db.conn.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    })
  }
}
