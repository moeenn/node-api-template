export const authConfig = {
  password: {
    minLength: 10 /* 10 is min required by OWASP */,
  },
  /**
   *  set expiry time for different token (in seconds)
   *  undefined means never expires
   */
  tokensExpiry: {
    auth: undefined,
    firstPassword: 60 * 60 * 72,
    passwordReset: 60 * 15,
  },
  /**
   *  fastify requires that keys (with default values) for all request context
   *  variables should be defined ahead of time
   */
  authStateDefaults: {
    user_id: 0,
    user_roles: [],
    token: "",
  },
}
