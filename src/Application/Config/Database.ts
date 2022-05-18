import postgres from "postgres"
import { Env } from "."

interface IDatabaseConfig {
  host: string,
  port: number,
  database: string,
  username: string,
  password: string,
}

function GetDatabaseConfig(): IDatabaseConfig {
  return {
    host: Env.Read("DB_HOST"),
    port: parseInt(Env.Read("DB_PORT")),
    database: Env.Read("DB_DATABASE"),
    username: Env.Read("DB_USERNAME"),
    password: Env.Read("DB_PASSWORD"),
  }
}

/**
 *  initialize and return instance of database connection
 * 
*/
function init(): postgres.Sql<Record<string, unknown>> {
  const config = GetDatabaseConfig()
  return postgres(config)
}

export default init() 