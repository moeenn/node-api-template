import { test, expect } from "vitest"
import { Random } from "@/vendor/helpers"
import { userController, userService } from "."

test("registerUser valid", async () => {
  const payload = {
    name: "random user",
    email: (await Random.string(5)) + "@site.com",
    roles: ["user"],
  }

  const user = await userController.registerUser(payload)
  expect(user.id).toBeTruthy()
  expect(user.name).toBe(payload.name)
  expect(user.email).toBe(payload.email)
  // expect(user.approved).toBe(true)
  expect(user.password).toBeFalsy()

  /* cleanup */
  const fullUser = await userService.getUserByEmail(user.email)
  await userService.removeUser(fullUser)
})

