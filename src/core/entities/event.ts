export interface IEvent {
  process: () => Promise<void>
}
