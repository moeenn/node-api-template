import { z, AnyZodObject } from "zod"
import { ValidationException } from "@/vendor/exceptions"

/**
 *  check if provided data satisfies a provided zod schema
 *
 */
export function validate<T extends AnyZodObject>(
  data: unknown,
  schema: T,
): z.infer<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw ValidationException("invalid data", JSON.parse(result.error.message))
  }

  return result.data
}
