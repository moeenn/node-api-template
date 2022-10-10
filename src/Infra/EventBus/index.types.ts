export type ListenerFunc = (...args: unknown[]) => Promise<void>
export type ErrorHandlerFunc = (error: Error) => void
