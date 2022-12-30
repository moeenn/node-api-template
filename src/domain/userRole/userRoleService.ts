import { database } from "@/vendor/entities/database"
import { User } from "@/domain/user"

/**
 *  remove a users role relation at the time of deletion of the user
 *
 */
async function removeUserRoles(user: User) {
  await database.userRole.deleteMany({
    where: {
      user_id: user.id,
    },
  })
}

export const userRoleService = {
  removeUserRoles,
}
