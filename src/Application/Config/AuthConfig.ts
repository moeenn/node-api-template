import { Service } from "typedi"

@Service()
export class AuthConfig {
  public readonly passwords = {
    min_length: 8,
  }

  public readonly tokens = {
    length: 32,
  }

  public readonly state_defaults = {
    user: {},
    token: "",
  }
}
