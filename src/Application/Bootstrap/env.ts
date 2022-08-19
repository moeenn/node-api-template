import { config } from "dotenv"
import EnvironmentConfig from "@/Application/Config/Environment"

/**
 *  users are able to configure all the required environment variables in the 
 *  Config/Environment.ts file. Here we check if all of them are prevent in the 
 *  environment
*/
function validateRequired(required: string[]) {
  const isEmpty = (value: string | undefined) => (
    value === null ||
    value === undefined ||
    value === ""
  )

  for (const value of required) {
    const isMissing = isEmpty(process.env[value])
    if (isMissing) throw new Error(`missing env variable: ${value}`)
  }
}

function init() {
  const { NODE_ENV } = process.env

  if (!EnvironmentConfig.load_in_production && NODE_ENV === "production") {
    return
  }

  config({ path: EnvironmentConfig.file })
  validateRequired(EnvironmentConfig.required)
}

export default init()