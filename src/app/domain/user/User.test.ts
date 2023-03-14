import { describe, it, expect } from "vitest"
import { Password, Random } from "@/core/helpers"
import { UserRole } from "@prisma/client"
import { UserController } from "./User.controller"
import { UserService } from "./User.service"
import { UserWithPassword, User } from "."
import { EmailService } from "@/core/email"
import { SetFirstPasswordEmailArgs } from "@/app/emails"
import { AuthService } from "@/app/domain/auth"
import { UserFactory } from "./User.factory"

describe("User", () => {
  it("getUserByID", async () => {
    const newUser = await UserFactory.create()
    expect(newUser.id).toBeTruthy()

    const foundUser = await UserService.getUserByID(newUser.id)
    expect(foundUser.id).toBe(newUser.id)

    /* cleanup */
    await UserService.removeUser(newUser)
  })

  it("getUserByEmail", async () => {
    const newUser = await UserFactory.create()
    expect(newUser.id).toBeTruthy()

    const foundUser = await UserService.getUserByEmail(newUser.email)
    expect(foundUser?.id).toBe(newUser.id)

    /* cleanup */
    await UserService.removeUser(newUser)
  })

  it("setUserPassword", async () => {
    const newUser = await UserFactory.create()
    expect(newUser.id).toBeTruthy()

    let updatedNewUser = await UserService.getUserByEmail(newUser.email)
    const newPassword = "123__Something_Random"
    await UserService.setUserPassword(newUser, newPassword)

    updatedNewUser = (await UserService.getUserByEmail(
      newUser.email,
    )) as UserWithPassword
    expect(updatedNewUser.password).toBeTruthy()

    const isMatch = await Password.verify(
      updatedNewUser.password?.hash ?? "",
      newPassword,
    )
    expect(isMatch).toBe(true)

    /* cleanup */
    await UserService.removeUser(newUser)
  })

  it("hasRole", async () => {
    const newUser = await UserFactory.create({ role: UserRole.GATE_KEEPER })
    expect(newUser.id).toBeTruthy()
    expect(newUser.role).toBe(UserRole.GATE_KEEPER)

    /* cleanup */
    await UserService.removeUser(newUser)
  })

  it("approveDisaproveUser", async () => {
    let newUser = await UserFactory.create()
    expect(newUser.id).toBeTruthy()
    expect(newUser.approved).toBe(true)

    await UserService.approveDisaproveUser(newUser, false)
    newUser = (await UserService.getUserByEmail(
      newUser.email,
    )) as UserWithPassword
    expect(newUser.approved).toBe(false)

    /* cleanup */
    await UserService.removeUser(newUser)
  })

  // TODO: finalize test
  // it("createSiteUser valid", async () => {
  //   const user = await UserFactory.create()
  //   expect(user.id).toBeTruthy()
  //   expect(user.name).toBe(UserFactory.data.name)
  //   expect(user.email).toBe(UserFactory.data.email)
  //   expect(user.approved).toBe(true)

  //   const sentEmail = EmailService.instance().sentEmails.find(
  //     (e) => e.to === UserFactory.data.email,
  //   )
  //   expect(sentEmail).toBeTruthy()

  //   const emailArgs = sentEmail?.email.args as SetFirstPasswordEmailArgs
  //   const userID = await AuthService.validateFirstPasswordToken(
  //     emailArgs.passwordToken,
  //   )
  //   expect(userID).toBe(user.id)

  //   /* cleanup */
  //   const fullUser = (await UserService.getUserByEmail(
  //     user.email,
  //   )) as UserWithPassword
  //   await UserService.removeUser(fullUser)
  //   EmailService.instance().clearSentEmails()
  // })

  // TODO: finalize test
  // it("createSiteUser duplicate email", async () => {
  //   const payload = {
  //     name: "random user",
  //     email: (await Random.string(5)) + "@site.com",
  //     role: UserRole.SITE_MANAGER,
  //   }

  //   const user = await UserController.createSiteUser(payload)
  //   await expect(() =>
  //     UserController.createSiteUser(payload),
  //   ).rejects.toThrowError(/already registered/)

  //   /* cleanup */
  //   await UserService.removeUser(user)
  // })

  it("approveDisapproveUser disapprove user", async () => {
    let user = await UserFactory.create()
    expect(user).toBeTruthy()
    expect(user.approved).toBe(true)

    await UserService.approveDisaproveUser(user, false)
    user = await UserService.getUserByIDWithPassword(user.id)
    expect(user.approved).toBe(false)

    /* cleanup */
    await UserService.removeUser(user)
  })

  it("listAllUsers", async () => {
    /* setup */
    const user = await UserFactory.create()

    const allUsers = await UserController.listAllUsers()
    expect(allUsers.length > 0).toBe(true)

    const found = allUsers.find((u: User) => u.email === user.email)
    expect(found?.name).toBe(user.name)

    /* cleanup */
    await UserService.removeUser(user)
  })

  it("updateProfile", async () => {
    /* setup */
    const user = await UserFactory.create()

    const updateProfilePayload = {
      name: "someone",
      skype: "sk_someone",
      phone: "292922929229",
      mobile: "23102938120398",
    }
    const updatedUser = await UserService.updateProfile(
      user,
      updateProfilePayload,
    )

    expect(updatedUser.id).toBe(user.id)
    expect(updatedUser.name).toBe(updateProfilePayload.name)
    expect(updatedUser.skype).toBe(updateProfilePayload.skype)
    expect(updatedUser.phone).toBe(updateProfilePayload.phone)
    expect(updatedUser.mobile).toBe(updateProfilePayload.mobile)

    /* cleanup */
    await UserService.removeUser(user)
  })

  it("updatePassword valid", async () => {
    /* setup */
    let user = await UserFactory.create()

    const updatePasswordPayload = {
      password: "some_random_strong_p@123&^#$%",
      confirmPassword: "some_random_strong_p@123&^#$%",
    }
    await UserController.updatePassword(user.id, updatePasswordPayload)

    user = await UserService.getUserByIDWithPassword(user.id)
    const isValid = await Password.verify(
      user.password?.hash ?? "",
      updatePasswordPayload.password,
    )
    expect(isValid).toBe(true)

    /* cleanup */
    await UserService.removeUser(user)
  })

  it("updatePassword invalid", async () => {
    /* setup */
    let user = await UserFactory.create()

    const updatePasswordPayload = {
      password: "some_random_strong_p@123&^#$%",
      confirmPassword: "some_other_random_strong_p13789123891239",
    }

    await expect(() =>
      UserController.updatePassword(user.id, updatePasswordPayload),
    ).rejects.toThrowError(/confirmation failed/)

    user = await UserService.getUserByIDWithPassword(user.id)

    const oldPasswordCheck = await Password.verify(
      user.password?.hash ?? "",
      UserFactory.data.password,
    )

    /* cleanup */
    await UserService.removeUser(user)
  })
})
