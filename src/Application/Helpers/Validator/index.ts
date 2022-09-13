import { z } from "zod"

const objectid = {
  handler(value: any): boolean {
    const pattern = /^[0-9a-fA-F]{24}$/
    return pattern.test(`${value}`)
  },
  options: {
    message: "invalid mongodb object id",
  }
}

export {
  z,
  objectid,
}