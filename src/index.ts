import "module-alias/register"
import { Server } from "@/core/server"

async function main() {
  const server = Server.new()
  Server.start(server)
}

main().catch(console.error)
