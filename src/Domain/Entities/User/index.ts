import { ValidationError } from "@src/Application/Types/Errors"
import { v4 as uuid } from "uuid"
import { z, SafeParseReturnType } from "zod"

interface IUser {
  id?: string,
  name: string,
  email: string,
  password: string,
}

class User implements IUser {
  id?: string
  name: string
  email: string
  password: string

  constructor(user: IUser) {
    const data = this.validate(user)
    if (!data.success) {
      throw new ValidationError(data.error.issues)
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
}

export {
  User,
  IUser,
}