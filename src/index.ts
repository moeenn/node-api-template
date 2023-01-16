import "module-alias/register"
import { Server } from "@/vendor/entities/server"

async function main() {
  const server = new Server()
  await server.run()
}

main().catch(console.error)


/**
 *  TODO:
 *  - socket optional filter functions 
 *  - mechanism for removing a closing socket from all channels
 *  - tests for base library implementation
*/