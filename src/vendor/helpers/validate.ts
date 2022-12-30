import { z, AnyZodObject } from "zod"
import { ValidationException } from "@/vendor/exceptions"

export function validate<T extends AnyZodObject>(
  data: unknown,
  schema: T,
): z.infer<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw ValidationException(result.error.message, result.error)
  }

  return result.data
}
