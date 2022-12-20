import "reflect-metadata"
import "module-alias/register"
import { Container } from "typedi"
import { Server } from "@/Vendor/Entities/Server"
import { ApplicationBootstrap } from "@/Application/Bootstrap"

async function main() {
  Container.get(ApplicationBootstrap)
  const server = Container.get(Server)
  await server.run()
}

main().catch(console.error)
