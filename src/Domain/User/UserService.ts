import { Service } from "typedi"
import { User, UserWithoutPassword, UserWithRelations } from "."
import { Database } from "@/Vendor/Entities/Database"
import { BadRequestException, NotFoundException } from "@/Vendor/Exceptions"
import { ICreateUserArgs } from "./UserService.types"
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
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
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
  public async getUserByEmail(email: string): Promise<UserWithRelations> {
    const user = await this.db.conn.user.findFirst({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
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
  public async createUser(args: ICreateUserArgs): Promise<UserWithRelations> {
    /**
     *  all users must have unique email addresses, ensure that provided
     *  email is unique
     */
    const exists = await this.db.conn.user.findFirst({
      where: {
        email: args.email,
      },
    })

    if (exists) {
      throw BadRequestException("user with email address already registered")
    }

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
      include: {
        roles: {
          include: {
            role: true,
          },
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
    const strengthTest = await Password.checkStrength(password)
    if (!strengthTest.strong) {
      throw BadRequestException("please provide a stronger password", {
        errors: strengthTest.errors,
      })
    }

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

  /**
   *  check whether a user has a particular role
   *
   */
  public async hasRole(
    user: UserWithRelations,
    slug: string,
  ): Promise<boolean> {
    for (const role of user.roles) {
      if (role.role.slug === slug) {
        return true
      }
    }
    return false
  }

  /**
   *  check if any users match the provided domain name pattern
   *
   */
  public async matchUserDomains(domain: string): Promise<number> {
    const users = await this.db.conn.user.findMany({
      where: {
        email: {
          endsWith: domain,
        },
      },
    })

    return users.length
  }

  /**
   *  approve or disapprove a users account
   *
   */
  public async approveDisaproveUser(
    user: UserWithoutPassword,
    status: boolean,
  ) {
    await this.db.conn.user.update({
      where: {
        id: user.id,
      },
      data: {
        approved: status,
      },
    })
  }
}
