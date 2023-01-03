import { userService } from "@/domain/user"
import {
  ILogin,
  ILoginResponse,
  ISetFirstPassword,
} from "./authController.schema"
import { BadRequestException, AuthException } from "@/vendor/exceptions"
import { authService } from "./authService"
import { Password } from "@/vendor/helpers"

async function login(args: ILogin, isAdmin: boolean): Promise<ILoginResponse> {
  let user
  try {
    user = await userService.getUserByEmail(args.email)
  } catch (err) {
    throw AuthException("invalid email or password")
  }

  if (!user.password) {
    throw BadRequestException("user account not configured")
  }

  /**
   *  ordinary users should not be able to login to the admin dashboard,
   *  only admins should be able to login to the dashboard
   */
  const isCurrentUserAadmin = await userService.hasRole(user, "admin")
  if (isAdmin && !isCurrentUserAadmin) {
    throw AuthException("only authorized roles can access this resource", {
      authorized_roles: ["admin"],
    })
  }

  /* only allow approved users to login */
  if (!user.approved) {
    throw AuthException(
      "user account has been disabled by system administrators",
    )
  }

  const isValid = await Password.verify(user.password, args.password)
  if (!isValid) {
    throw AuthException("invalid email or password")
  }

  /* dont send password hash back to the client */
  user.password = null

  const token = await authService.generateLoginAuthToken(user.id)
  return { user, token }
}

/**
 *  before a user sets their first password, their password field will be
 *  empty
 */
async function setFirstPassword(args: ISetFirstPassword) {
  const userID = await authService.validateFirstPasswordToken(
    args.password_token,
  )

  const user = await userService.getUserByIDWithPassword(userID)
  await userService.setUserPassword(user, args.password)
}

export const authController = {
  login,
  setFirstPassword,
}
