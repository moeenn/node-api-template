import { config } from "dotenv"
import { env } from "process"
import Env from "@src/Infra/Env"

function init(): Env {
  if (env.NODE_ENV !== "production") {
    config({ path: "src/.env.docker" })
  }
  return new Env(env)
}

export default init()