export type Func = (...args: Record<string, unknown>[]) => Promise<void>

export type ErrorHandlerFunc = (error: Error) => void

export interface IEventListener {
  key: string
  handler: (payload: unknown) => Promise<void>
}
