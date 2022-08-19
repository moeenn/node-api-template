import Validator from "@/Application/Helpers/Validator"
import { Exception } from "@/Application/Classes"

/* eslint-disable  @typescript-eslint/no-explicit-any */
function validate(data: any, rules: Validator.Rules) {
  const validator = new Validator(data, rules)
  if (validator.fails()) {
    throw new Exception("validation error", 422, validator.errors)
  }

  return data
}

export default validate 
