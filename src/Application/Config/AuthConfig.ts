import { Service } from "typedi"

@Service()
export class AuthConfig {
  public readonly passwords_min_length: number
  public readonly tokens_length: number
  public readonly auth_state_defaults: {
    user_id: number
    user_roles: string[]
    token: string
  }

  constructor() {
    this.passwords_min_length = 10 /* 10 is min required by OWASP */
    this.tokens_length = 32
    this.auth_state_defaults = {
      user_id: 0,
      user_roles: [],
      token: "",
    }
  }
}
