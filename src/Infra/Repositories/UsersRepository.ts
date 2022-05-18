import User from "@src/Domain/Entities/User/User"
import { IUser } from "@src/Domain/Entities/User/UserSchema"

class UsersRepository {
  private table: string
  private conn: Function

  constructor(conn: Function, table: string) {
    this.conn = conn
    this.table = table
  }

  All(): Array<User> {
    const all = this.conn`
      SELECT * FROM ${this.table};
    `

    return [...all].map((user: IUser): User => new User(user))
  }
  
  // Create(user: User): void {}
  // Delete(id: string): void {}
}

export default UsersRepository