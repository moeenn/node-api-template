import { User, UserWithPassword } from "."
import { database } from "@/core/database"
import { BadRequestException, NotFoundException } from "@/core/exceptions"
import { CreateUserArgs, UpdateProfileArgs, CreateSiteUserArgs } from "./User.schema"
import { Password } from "@/core/helpers"

export const UserService = {
  /**
   * get a single user using ID
   *
   */
  async getUserByID(id: number): Promise<User> {
    const user = await database.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw NotFoundException(`user with id ${id} not found`)
    }

    return Object.assign(user, { password: undefined })
  },

  /**
   * get s single user with password
   *
   */
  async getUserByIDWithPassword(id: number): Promise<UserWithPassword> {
    const user = await database.user.findUnique({
      where: { id },
      include: {
        password: true,
      },
    })

    if (!user) {
      throw NotFoundException(`user with id ${id} not found`)
    }

    return user
  },

  /**
   * get a single user using email
   *
   */
  async getUserByEmail(email: string): Promise<UserWithPassword | undefined> {
    const user = await database.user.findFirst({
      where: { email },
      include: {
        password: true,
      },
    })

    if (!user) return
    return user
  },

  /**
   * list out all users
   *
   */
  async listAllUsers(): Promise<User[]> {
    const users = await database.user.findMany({})
    return users
  },

  /**
   * check is a user email is already in use
   *
   */
  async isEmailInUse(email: string): Promise<boolean> {
    const user = await database.user.findFirst({
      where: { email },
    })

    return !!user
  },

  /**
   * register a new user with the system
   *
   */
  async createUser(args: CreateUserArgs): Promise<User> {
    /**
     * all users must have unique email addresses, ensure that provided
     * email is unique
     */
    const exists = await database.user.findFirst({
      where: {
        email: args.email,
      },
    })

    if (exists) {
      throw BadRequestException("user with email address already registered")
    }

    /**
     * all users will be created with an empty password. They will use the
     * password token to set a password
     */
    const user = await database.user.create({
      data: {
        name: args.name,
        email: args.email,
        role: args.role,
      },
    })

    return user
  },

/**
   * register a new site user (i.e. gatekeeper, subcontractor) with the system
   *
   */
 async createSiteUser(args: CreateSiteUserArgs): Promise<User> {
  /**
   * all users must have unique email addresses, ensure that provided
   * email is unique
   */
  const exists = await database.user.findFirst({
    where: {
      email: args.email,
    },
  })

  if (exists) {
    throw BadRequestException("user with email address already registered")
  }

  /**
   * all users will be created with an empty password. They will use the
   * password token to set a password
   */
  const user = await database.user.create({
    data: {
      name: args.name,
      email: args.email,
      role: args.role,
      siteUsers: {
        create: {
          siteId: args.siteId,
        }
      }
    },
  })

  return user
},  

  /**
   * set password for a user
   *
   */
  async setUserPassword(user: User, password: string) {
    const strengthTest = await Password.checkStrength(password)
    if (!strengthTest.strong) {
      throw BadRequestException("please provide a stronger password")
    }

    const hash = await Password.hash(password)
    await database.password.upsert({
      where: {
        userId: user.id,
      },
      update: { hash },
      create: {
        userId: user.id,
        hash,
      },
    })
  },

  /**
   * approve or disapprove a users account
   *
   */
  async approveDisaproveUser(user: User, status: boolean) {
    await database.user.update({
      where: {
        id: user.id,
      },
      data: {
        approved: status,
      },
    })
  },

  /**
   * update user profile
   *
   */
  async updateProfile(user: User, args: UpdateProfileArgs): Promise<User> {
    const updatedUser = await database.user.update({
      where: {
        id: user.id,
      },
      data: { ...args },
    })

    return updatedUser
  },

  /**
   * completely delete a single user
   *
   */
  async removeUser(user: User) {
    /* finally delete the actual user */
    await database.user.delete({
      where: {
        id: user.id,
      },
    })
  },
}
