export const authConfig = {
  password: {
    minLength: 10 /* 10 is min required by OWASP */,
  },
  tokens: {
    length: 32,
  },
  authStateDefaults: {
    user_id: 0,
    user_roles: [],
    token: "",
  },
}
