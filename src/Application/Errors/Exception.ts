class Exception extends Error {
  public status: number
  public details?: unknown

  constructor(message: string, status = 500, details: unknown = undefined) {
    super(message)
    this.status = status

    if (details) {
      this.details = details
    }
  }
}

export default Exception