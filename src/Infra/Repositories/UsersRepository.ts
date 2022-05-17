import Repository from "@src/Application/Types/Repository"
import User from "@src/Domain/Entities/User/User"

class UsersRepository extends Repository<User> {
  List(): Array<User> {
    return this.All()
  }
  
  Create(user: User): User {
    return this.Save(user)
  }

  Delete(id: string): void {
    const callback = (user: User): boolean => user.id === id
    this.Remove(callback)
  }
}

export default new UsersRepository()