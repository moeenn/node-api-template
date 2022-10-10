import "module-alias/register"
import "@/Application/Bootstrap"
import { ServerFactory } from "@/Infra/HTTP/Server"
import { ServerConfig } from "@/Application/Config"

function main() {
  const server = new ServerFactory()
  server.run(ServerConfig.port)
}

main()
