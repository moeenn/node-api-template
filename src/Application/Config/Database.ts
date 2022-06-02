import Env from "./Env"

interface IDatabaseConfig {
  host: string,
  port: number,
  database: string,
  username: string,
  password: string,
}

function init(): IDatabaseConfig {
  return {
    host: Env.Read("DB_HOST"),
    port: parseInt(Env.Read("DB_PORT")),
    database: Env.Read("DB_DATABASE"),
    username: Env.Read("DB_USERNAME"),
    password: Env.Read("DB_PASSWORD"),
  }
}

export default init()