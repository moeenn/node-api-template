type Func = (...args: Record<string, unknown>[]) => Promise<void>
type ErrorHandlerFunc = (error: Error) => void
interface IEventListener {
  key: string,
  handler: (payload: unknown) => Promise<void>
}

export { Func, ErrorHandlerFunc, IEventListener }