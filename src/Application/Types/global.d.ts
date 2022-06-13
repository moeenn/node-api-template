export {}

declare global {
  type Option<T> = T | undefined
  type Obj = Record<string, unknown>
}