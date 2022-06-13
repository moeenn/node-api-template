import { ZodObject, ZodIssue } from "zod"

/**
 *  helper function which makes it easier to check if a zod schema is valid
 * 
*/
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function verify(data: unknown, schema: ZodObject<any>): Option<ZodIssue[]> {
  const result = schema.safeParse(data)
  if (!result.success) {
    return result.error.issues
  }
}

export default verify