import { Exception } from "@/Application/Exceptions"
import { AuthToken, IDocumentAuthToken, IDocumentUser } from "@/Domain/Models"

/**
 *  check if an auth bearer token is valid or not
 *  if valid, return the user to it belongs
 *
 */
async function validateAuthToken(token: string): Promise<IDocumentAuthToken> {
  const authToken = await AuthToken.repo.findOne({ token }).populate("user")

  if (!authToken || !authToken.user) {
    throw new Exception("invalid auth bearer token", 401)
  }

  return authToken
}

/**
 *  create a new auth token
 *
 */
async function createAuthToken(
  user: IDocumentUser,
  token: string,
): Promise<IDocumentAuthToken> {
  const authToken = new AuthToken.repo({ user, token })
  await authToken.save()

  return authToken
}

/**
 *  delete auth token (i.e. logout user)
 *
 */
async function deleteAuthToken(user: IDocumentUser, token: string) {
  const authToken = await AuthToken.repo.findOne({ user, token })
  if (!authToken) {
    throw new Exception("invalid auth bearer token", 401)
  }

  await authToken.delete()
}

export const AuthTokenActions = {
  validateAuthToken,
  createAuthToken,
  deleteAuthToken,
}
