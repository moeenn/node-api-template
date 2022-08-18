import "module-alias/register"
import "@/Application/Bootstrap"
import Server from "@/Infra/HTTP/Server"
import { ServerConfig } from "@/Application/Config"

export function main() {
	const server = Server.create()
	Server.run(server, ServerConfig.port)
}

main()