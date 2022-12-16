import { Service } from "typedi"
import { User, UserService } from "."
import { RoleService } from "@/Domain/Role"
import { IRegisterUser } from "./UserController.schema"

@Service()
export class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  /**
   *  register a new user with the system with provided roles and details
   *
   */
  public async registerUser(args: IRegisterUser): Promise<User> {
    const roles = await this.roleService.getRolesBySlugs(args.roles)
    const user = await this.userService.createUser({
      name: args.name,
      email: args.email,
      roles,
    })

    return user
  }
}
