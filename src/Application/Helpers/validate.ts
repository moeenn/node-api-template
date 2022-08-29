import Validator from "@/Application/Helpers/Validator"
import { Exception } from "@/Application/Classes"

/* eslint-disable  @typescript-eslint/no-explicit-any */
function validate(data: any, rules: Validator.Rules) {
  const v = new Validator(data, rules)
  if (v.fails()) {
    throw new Exception("validation error", 422, v.errors)
  }

  return data
}

export default validate