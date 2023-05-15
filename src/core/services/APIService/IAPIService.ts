export interface IAPIService {
  validate<T>(schema: Record<string, unknown>, data: unknown): Error | T
  get(
    url: string,
    bearerToken?: string,
  ): Promise<Record<string, unknown> | Error>
  post(
    url: string,
    payload: unknown,
    bearerToken?: string,
  ): Promise<Record<string, unknown> | Error>
  put(
    url: string,
    payload: unknown,
    bearerToken?: string,
  ): Promise<Record<string, unknown> | Error>
  delete(
    url: string,
    bearerToken?: string,
  ): Promise<Record<string, unknown> | Error>
}
