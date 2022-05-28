import { User, IUser } from "@src/Domain/Entities/User"
import { Row } from "@src/Application/Config/Database"

/**
 *  convert a single row into a User entity
 * 
*/
function Single(results: Row[]): User | undefined {
  const [row] = results
  if (!row) return

  return new User(row as IUser)
}

/**
 *  convert multiple rows into User entities
 *  
*/
function Multiple(results: Row[]): User[] {
  return results.map((row: Row) => new User(row as IUser))
}

export default {
 Single,
 Multiple,
}