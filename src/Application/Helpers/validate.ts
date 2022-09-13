import { z, AnyZodObject, ZodError } from "zod"
import { Exception } from "@/Application/Classes"

/* eslint-disable  @typescript-eslint/no-explicit-any */
function validate<T extends AnyZodObject>(
  data: any,
  schema: T
): z.infer<T> {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Exception(error.message, 422, error)
    }
    throw error
  }
}

export default validate