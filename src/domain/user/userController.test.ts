import { test, expect } from "vitest"
import { Random } from "@/vendor/helpers"
import { userController, userService } from "."
import { throws } from "@/vendor/testing"

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
  expect(user.approved).toBe(true)
  expect(user.password).toBeFalsy()

  /* cleanup */
  const fullUser = await userService.getUserByEmail(user.email)
  await userService.removeUser(fullUser)
})

test("registerUser duplicate email", async () => {
  const payload = {
    name: "random user",
    email: (await Random.string(5)) + "@site.com",
    roles: ["user"],
  }

  const user = await userController.registerUser(payload)
  const isError = await throws(async () => {
    await userController.registerUser(payload)
  }, "already registered")
  expect(isError).toBe(true)

  /* cleanup */
  await userService.removeUser(user)
})

test("registerUser invalid role", async () => {
  const payload = {
    name: "random user",
    email: (await Random.string(5)) + "@site.com",
    roles: ["some_random_role"],
  }

  const isError = await throws(
    async () => await userController.registerUser(payload),
    "role not found"
  )
  expect(isError).toBe(true)
})

test("approveDisapproveUser disapprove user", async () => {
  const payload = {
    name: "random user",
    email: (await Random.string(5)) + "@site.com",
    roles: ["user"],
  }

  let user = await userController.registerUser(payload)
  expect(user).toBeTruthy()
  expect(user.approved).toBe(true)

  await userService.approveDisaproveUser(user, false)
  user = await userService.getUserByIDWithPassword(user.id)
  expect(user.approved).toBe(false)

  /* cleanup */
  await userService.removeUser(user)
})

