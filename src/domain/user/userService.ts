import { User, UserWithoutPassword, UserWithRelations } from "."
import { database } from "@/vendor/entities/database"
import { BadRequestException, NotFoundException } from "@/vendor/exceptions"
import { ICreateUserArgs } from "./userService.types"
import { Password } from "@/vendor/helpers"

/**
 *  get a single user using ID
 *
 */
async function getUserByID(id: number): Promise<UserWithoutPassword> {
  const user = await database.user.findUnique({
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
async function getUserByEmail(email: string): Promise<UserWithRelations> {
  const user = await database.user.findFirst({
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
async function createUser(args: ICreateUserArgs): Promise<UserWithRelations> {
  /**
   *  all users must have unique email addresses, ensure that provided
   *  email is unique
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
   *  all users will be created with an empty password. They will use the
   *  password token to set a password
   */
  const user = await database.user.create({
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
async function setUserPassword(user: User, password: string) {
  const strengthTest = await Password.checkStrength(password)
  if (!strengthTest.strong) {
    throw BadRequestException("please provide a stronger password", {
      errors: strengthTest.errors,
    })
  }

  const hash = await Password.hash(password)
  await database.user.update({
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
async function hasRole(
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
async function matchUserDomains(domain: string): Promise<number> {
  const users = await database.user.findMany({
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
async function approveDisaproveUser(
  user: UserWithoutPassword,
  status: boolean,
) {
  await database.user.update({
    where: {
      id: user.id,
    },
    data: {
      approved: status,
    },
  })
}

export const userService = {
  getUserByID,
  getUserByEmail,
  createUser,
  setUserPassword,
  hasRole,
  matchUserDomains,
  approveDisaproveUser,
}
