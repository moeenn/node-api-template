import { Service } from "typedi"

@Service()
export class AuthConfig {
  public readonly passwords_min_length: number
  public readonly tokens_length: number
  public readonly auth_state_defaults: {
    user_id: number
    token: string
  }

  constructor() {
    this.passwords_min_length = 8
    this.tokens_length = 32
    this.auth_state_defaults = {
      user_id: 0,
      token: "",
    }
  }
}
