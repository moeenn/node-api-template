import "module-alias/register"
import "@/app/config"

import { Server } from "@/core/server"
import { logger } from "./core/server/logger"

async function main() {
  const server = Server.new()
  await Server.start(server)
}

main().catch(logger.error)
