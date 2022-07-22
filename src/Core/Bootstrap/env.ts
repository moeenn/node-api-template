import { config } from "dotenv"
import envconfig from "@/Core/Config/env.json"
import joi from "joi"

/**
 *  users are able to configure all the required environment variables in the 
 *  config/env.json file. Here we check if all of them are prevent in the 
 *  environment
*/
function validateRequired(required: string[]) {
  const schema = joi.string().min(1).required()

  for (const value of required) {
    const { error } = schema.validate(process.env[value])
    if (error) throw new Error(`missing env variable: ${value}`) 
  }
}

function init() {
  const { NODE_ENV } = process.env

  if (!envconfig.load_in_production && NODE_ENV === "production") {
    return
  }

  config({ path: envconfig.file })
  validateRequired(envconfig.required)
}

export default init()