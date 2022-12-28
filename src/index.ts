import "reflect-metadata"
import "module-alias/register"
import { Container } from "typedi"
import { Server } from "@/Vendor/Entities/Server"

async function main() {
  const server = Container.get(Server)
  await server.run()
}

main().catch(console.error)
