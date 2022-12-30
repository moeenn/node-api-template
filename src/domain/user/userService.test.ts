import { test, expect } from "vitest"
import { userService } from "./userService"
import { roleService } from "@/domain/role"
import { Password } from "@/vendor/helpers"

test("getUserByID", async () => {
  const roleUser = await roleService.getRoleBySlug("user")
  const newUser = await userService.createUser({
    name: "someone",
    email: "someone@site.com",
    roles: [roleUser],
  })
  expect(newUser.id).toBeTruthy()

  const foundUser = await userService.getUserByID(newUser.id)
  expect(foundUser.id).toBe(newUser.id)

  /* cleanup */
  await userService.removeUser(newUser)
})

test("getUserByEmail", async () => {
  const roleUser = await roleService.getRoleBySlug("user")
  const newUser = await userService.createUser({
    name: "someone",
    email: "someone@site.com",
    roles: [roleUser],
  })
  expect(newUser.id).toBeTruthy()

  const foundUser = await userService.getUserByEmail("someone@site.com")
  expect(foundUser.id).toBe(newUser.id)

  /* cleanup */
  await userService.removeUser(newUser)
})

test("setUserPassword", async () => {
  const roleUser = await roleService.getRoleBySlug("user")
  let newUser = await userService.createUser({
    name: "someone",
    email: "someone@site.com",
    roles: [roleUser],
  })
  expect(newUser.id).toBeTruthy()
  expect(newUser.password).toBeFalsy()

  const newPassword = "123__Something_Random"
  await userService.setUserPassword(newUser, newPassword)

  newUser = await userService.getUserByEmail(newUser.email)
  expect(newUser.password).toBeTruthy()

  const isMatch = await Password.verify(newUser.password ?? "", newPassword)
  expect(isMatch).toBe(true)

  /* cleanup */
  await userService.removeUser(newUser)
})
