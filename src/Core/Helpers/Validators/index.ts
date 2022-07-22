import { CustomValidator } from "joi"

/**
 *  this joi custom validator checks if a provided string is a valid mongodb
 *  ObjectId. It can be used as follows:
 * 
 *  joi.string().custom(objectId, "mongodb object id").required()
*/
export const objectId: CustomValidator = (value) => {
  const pattern = /^[0-9a-fA-F]{24}$/
  const isValid = pattern.test(value)

  if (!isValid) {
    throw new Error("invalid mongodb object id")
  }

  return value
}