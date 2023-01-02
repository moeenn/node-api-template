import { test, expect } from "vitest"
import { env, Random } from "@/vendor/helpers"
import { throws } from "@/vendor/testing"
import { authController } from "./authController"
import { userController, userService } from "@/domain/user"

test("JWT_SECRET is set", async () => {
  let secret
  const isError = await throws(() => (secret = env("JWT_SECRET")))
  expect(isError).toBe(false)
  expect(secret).toBeTruthy()
})

test("login invalid credentials", async () => {
  const payload = {
    email: (await Random.string(5)) + "@site.com",
    password: await Random.string(10),
  }

  const isError = await throws(
    async () => await authController.login(payload, false),
    "invalid",
  )

  expect(isError).toBe(true)
})

test("login account not configured", async () => {
  const registerPayload = {
    name: "random user",
    email: (await Random.string(5)) + "@site.com",
    roles: ["user"],
  }

  const user = await userController.registerUser(registerPayload)
  expect(user).toBeTruthy()

  const loginPayload = {
    email: registerPayload.email,
    password: await Random.string(10),
  }

  const isError = await throws(
    async () => await authController.login(loginPayload, false),
    "not configured",
  )
  expect(isError).toBe(true)

  /* cleanup */
  await userService.removeUser(user)
})
