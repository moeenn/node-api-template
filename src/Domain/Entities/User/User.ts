import { UserSchema, IUser } from "./UserSchema"
import { ValidationError } from "@src/Application/Types/Errors"
import { v4 as uuid } from "uuid"

export default class User {
  public id: string
  public name: string
  public email: string
  public password: string

  constructor(user: IUser) {
    const data = UserSchema.safeParse(user)
    if (!data.success) {
      throw new ValidationError(data.error.issues)
    }

    this.id = user.id ?? uuid()
    this.name = user.name
    this.email = user.email
    this.password = user.password
  }
}