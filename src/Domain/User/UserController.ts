import { Service } from "typedi"
import { User, UserService, UserWithoutPassword } from "."
import { RoleService } from "@/Domain/Role"
import { PasswordTokenService } from "@/Domain/PasswordToken"
import { IApproveDisapproveUser, IRegisterUser } from "./UserController.schema"
import { BadRequestException } from "@/Vendor/Exceptions"

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

  /**
   *  approve or disapprove a user's account
   *
   */
  public async approveDisapproveUser(
    currentUserID: number,
    args: IApproveDisapproveUser,
  ) {
    const user = await this.userService.getUserByID(args.user_id)
    if (user.id === currentUserID) {
      throw BadRequestException("cannot disable own account")
    }

    await this.userService.approveDisaproveUser(user, args.status)
  }

  // TODO: remove user?
}
