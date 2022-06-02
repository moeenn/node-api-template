import postgres from "postgres"
import DatabaseConfig from "@src/Application/Config/Database"

export type SQL = postgres.Sql<Record<string, unknown>>
export type Row = postgres.Row

/**
 *  initialize and return instance of database connection
 * 
*/
function init(): SQL {
  return postgres(DatabaseConfig)
}

export default init() 