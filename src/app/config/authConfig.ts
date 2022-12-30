export const authConfig = {
  password: {
    minLength: 10 /* 10 is min required by OWASP */,
  },
  /* TODO: deprecate */
  tokens: {
    length: 32,
  },
  /**
   *  set expiry time for different token (in seconds)
   *  undefined means never expires
   */
  tokensExpiry: {
    auth: undefined,
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
