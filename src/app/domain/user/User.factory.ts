import { database } from "@/core/database"
import { Password } from "@/core/helpers"
import { UserRole } from "@prisma/client"
import { UserWithPassword, User } from "./index"

type CreateArgs = Partial<{
  email: string
  name: string
  role: UserRole
}>

export const UserFactory = {
  data: {
    email: "sample@site.com",
    name: "Sample",
    role: UserRole.SITE_MANAGER,
    password: "123_Orangez",
  },

  async create(args: CreateArgs = {}): Promise<UserWithPassword> {
    const data = Object.assign(this.data, args)

    return await database.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        password: {
          create: {
            hash: await Password.hash(data.password),
          },
        },
      },
      include: {
        password: true,
      },
    })
  },

  async createWithoutPassword(
    args: Omit<CreateArgs, "password"> = {},
  ): Promise<User> {
    const data = Object.assign(this.data, args)

    return await database.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
      },
    })
  },
}
