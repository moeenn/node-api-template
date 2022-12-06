/**
 *  check if a string is a valid JSON or not
 *
 */
export function isJSON(str: string): boolean {
  try {
    return JSON.parse(str) && !!str
  } catch (e) {
    return false
  }
}
