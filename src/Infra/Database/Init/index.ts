import postgres from "postgres"
import DatabaseConfig from "@src/Application/Config/Database"

export type Row = postgres.Row

/**
 *  initialize and return instance of database connection
 * 
*/
function init(): postgres.Sql<Record<string, unknown>> {
  return postgres(DatabaseConfig)
}

export default init() 