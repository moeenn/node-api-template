import { Password as Pwd } from "@/core/helpers"
import { faker } from "@faker-js/faker"

export const PasswordFactory = {
  async make(password: string | undefined = undefined) {
    return {
      hash: await Pwd.hash(
        password ?? faker.string.alphanumeric({ length: 10 }),
      ),
    }
  },
}
