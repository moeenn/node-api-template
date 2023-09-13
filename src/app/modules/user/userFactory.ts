import { faker } from "@faker-js/faker"
import { UserRole } from "@prisma/client"

export const UserFactory = {
  make(role: UserRole = UserRole.USER) {
    return {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      role,
    }
  },
}
