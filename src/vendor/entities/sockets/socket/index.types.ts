export interface ISocket {
  id: string
  send: (data: unknown) => void
}
