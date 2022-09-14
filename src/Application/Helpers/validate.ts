import { z, AnyZodObject } from "zod"
import { Exception } from "@/Application/Classes"

function validate<T extends AnyZodObject>(
  data: unknown,
  schema: T
): z.infer<T> {

  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Exception(result.error.message, 422, result.error)
  }

  return result.data
}

export default validate