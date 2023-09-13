import process from "node:process"
import { db, ping } from "@/core/database"

export const HealthCheckService = {
  /**
   * check status of the API and its connection with the database
   *
   */
  async healthcheck() {
    const isConnected = await ping(db)

    return {
      uptime: process.uptime(),
      timestamp: Date.now(),
      status: "OK",
      database: isConnected ? "CONNECTED" : "DISCONNECTED",
    }
  },

  /**
   * check memory usage of the running server,
   * make sure this endpoint is protected
   */
  async memoryUsage() {
    const toMB = (n: number) => Math.round((n / 1024 / 1024) * 100) / 100
    const used = process.memoryUsage()

    const heapTotal = toMB(used.heapTotal)
    const heapUsed = toMB(used.heapUsed)

    return {
      heap_total: heapTotal + " MB",
      heap_used: heapUsed + " MB",
    }
  },
}
