export async function throws(
  callback: () => unknown,
  messagePartial?: string,
): Promise<boolean> {
  try {
    await callback()
  } catch (err) {
    if (!messagePartial) {
      return true
    }

    if (err instanceof Error) {
      if (err.message.includes(messagePartial)) {
        return true
      }
    }
  }

  return false
}
