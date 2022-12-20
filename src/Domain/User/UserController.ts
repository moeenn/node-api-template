import { Service } from "typedi"
import { User, UserService, UserWithoutPassword } from "."
import { RoleService } from "@/Domain/Role"
import { PasswordTokenService } from "@/Domain/PasswordToken"
import { IRegisterUser } from "./UserController.schema"

@Service()
export class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private passwordTokenService: PasswordTokenService,
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

    await this.passwordTokenService.createToken(user)
    return user
  }

  /**
   *  get complete details of a single user, using their id
   *
   */
  public async getUser(id: number): Promise<UserWithoutPassword> {
    const user = await this.userService.getUserByID(id)
    return user
  }
}
