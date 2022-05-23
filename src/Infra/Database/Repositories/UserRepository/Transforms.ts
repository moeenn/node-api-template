import { User, IUser } from "@src/Domain/Entities/User"
import { Row } from "@src/Application/Config/Database"

function List(results: Row[]): User[] {
  return results.map((row: Row) => new User(row as IUser))
}

export default {
  List,
}