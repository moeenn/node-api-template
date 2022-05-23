import { config } from "dotenv"
import { env } from "process"
import Environment from "@src/Application/Types/Environment"

function init(): Environment {
  if (env.NODE_ENV !== "production") {
    config({ path: "src/.env.docker" })
  }
  return new Environment(env)
}

export default init()
