import SQL, { Row } from "@src/Application/Config/Database"
import { User } from "@src/Domain/Entities/User"

function List(): Promise<Row[]> {
  return SQL`
    SELECT * FROM users
  `
}

function Create(user: User): void {
  const { id, name, email, password } = user

  SQL`
    INSERT INTO users (id, name, email, password)
    VALUES (${id}, ${name}, ${email}, ${password})
  `
}

function Delete(id: string): void {
  SQL`
    DELETE FROM users
    WHERE id = ${id}
  `
}

export default {
  List,
  Create,
  Delete,
}