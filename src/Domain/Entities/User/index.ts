import { v4 as uuid } from "uuid"
import { z, SafeParseReturnType } from "zod"
import Exception from "@/Application/Classes/Exception"
import Password from "@/Application/Helpers/Password"

export interface IUser {
  id?: string,
  name: string,
  email: string,
  password: string,
}

export default class User implements IUser {
  id?: string
  name: string
  email: string
  password: string

  constructor(user: IUser) {
    const data = this.validate(user)
    if (!data.success) {
      throw new Exception(
        "Validation Error: Cannot instantiate user",
        data.error.issues
      )
    }

    this.id = user.id ?? uuid()
    this.name = user.name
    this.email = user.email
    this.password = user.password
  }

  private validate(user: IUser): SafeParseReturnType<IUser, IUser> {
    const schema = z.object({
      id: z.string().optional(),
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })
   
    return schema.safeParse(user)
  }

  /**
   *  alternative constructor
   *  
  */
  public static async NewUser(data: IUser): Promise<User> {
    data.password = await Password.hash(data.password)
    return new User(data)
  }
}
