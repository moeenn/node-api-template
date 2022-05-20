import { ValidationError } from "@src/Application/Types/Errors"
import { v4 as uuid } from "uuid"
import { z, SafeParseReturnType } from "zod"

interface IUser {
  id?: string,
  name: string,
  email: string,
  password: string,
}

interface User extends IUser {}
class User implements IUser {
  constructor(user: IUser) {
    const data = this.validate(user)
    if (!data.success) {
      throw new ValidationError(data.error.issues)
    }

    Object.assign(this, user, {})
    this.id = user.id ?? uuid()
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
}

export {
  User,
  IUser,
}