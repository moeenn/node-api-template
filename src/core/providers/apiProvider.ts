import axios, { Axios } from "axios"
import Ajv from "ajv"
import { logger } from "@/core/server/logger"

export interface IAPIProvider {
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
}

/**
 * any time we need to integrate an enternal JSON REST API in our backend, we
 * will use this class as a dependency for making API requests
 */
export class APIProvider implements IAPIProvider {
  private axiosInstance: Axios
  private vInstance: Ajv
  private baseURL: string
  private timeout: number

  constructor(baseURL: string, timeoutSeconds = 5) {
    this.baseURL = baseURL
    this.timeout = timeoutSeconds

    this.axiosInstance = axios.create({ timeout: this.timeout * 1000 })
    this.vInstance = new Ajv()
  }

  validate<T>(schema: Record<string, unknown>, data: unknown): Error | T {
    if (data instanceof Error) {
      return data
    }

    const isValid = this.vInstance.validate(schema, data)
    if (!isValid) {
      const message = "unknown data-structure returned from external API"
      logger.error({ data }, message)
      return new Error(message)
    }

    return data as T
  }

  async get(
    url: string,
    bearerToken: string | undefined = undefined,
  ): Promise<Record<string, unknown> | Error> {
    const targetURL = this.baseURL + url

    try {
      const res = await this.axiosInstance.get(targetURL, {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      return res.data
    } catch (err) {
      logger.error({ error: err }, "error executing GET request")
      if (err instanceof Error) {
        return new Error(err.message)
      }

      return new Error("request failed")
    }
  }

  async post(
    url: string,
    payload: unknown,
    bearerToken: string | undefined = undefined,
  ): Promise<Record<string, unknown> | Error> {
    const targetURL = this.baseURL + url

    try {
      const res = await this.axiosInstance.post(targetURL, payload, {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      return res.data
    } catch (err) {
      logger.error({ error: err }, "error executing POST request")
      if (err instanceof Error) {
        return new Error(err.message)
      }

      return new Error("request failed")
    }
  }

  async put(
    url: string,
    payload: unknown,
    bearerToken: string | undefined = undefined,
  ): Promise<Record<string, unknown> | Error> {
    const targetURL = this.baseURL + url

    try {
      const res = await this.axiosInstance.put(targetURL, payload, {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      return res.data
    } catch (err) {
      logger.error({ error: err }, "error executing PUT request")
      if (err instanceof Error) {
        return new Error(err.message)
      }

      return new Error("request failed")
    }
  }

  async delete(
    url: string,
    bearerToken: string | undefined = undefined,
  ): Promise<Record<string, unknown> | Error> {
    const targetURL = this.baseURL + url

    try {
      const res = await this.axiosInstance.delete(targetURL, {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      return res.data
    } catch (err) {
      logger.error({ error: err }, "error executing DELETE request")
      if (err instanceof Error) {
        return new Error(err.message)
      }

      return new Error("request failed")
    }
  }
}
