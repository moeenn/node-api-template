import Validator from "validatorjs"

Validator.register("objectid", (value) => {
  const pattern = /^[0-9a-fA-F]{24}$/
  return pattern.test(`${value}`)
}, ":attribute is not in a valid mongodb object id")

export default Validator