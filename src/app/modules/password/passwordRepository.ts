import { User } from "@prisma/client"
import { db } from "@/core/database"
import { Password as Pwd } from "@/core/helpers"

export const PasswordRepository = {
  async updateUserPassword(user: User, newPassword: string): Promise<void> {
    await db.password.update({
      where: {
        userId: user.id,
      },
      data: {
        hash: await Pwd.hash(newPassword),
      },
    })
  },

  async setUserPassword(user: User, password: string): Promise<void> {
    await db.password.create({
      data: {
        userId: user.id,
        hash: await Pwd.hash(password),
      },
    })
  },
}
