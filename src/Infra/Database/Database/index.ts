import postgres from "postgres"
import { Service } from "typedi"
import DatabaseConfig from "@/Application/Config/Database"

export type SQL = postgres.Sql<Obj>
export type Row = postgres.Row

export interface IDatabase {
  sql: SQL
}

@Service()
export default class Database implements IDatabase {
  public sql: SQL

  constructor(config: DatabaseConfig) {
    this.sql = postgres(config)
  }
}