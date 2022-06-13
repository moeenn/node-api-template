class Exception extends Error {
  public cause: unknown

  constructor(message: string, cause: unknown) {
    super(message)
    this.cause = cause
  }
}

export default Exception