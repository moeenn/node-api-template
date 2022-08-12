import "module-alias/register"
import "@/Core/Bootstrap"
import Server from "@/Core/Server"
import { ServerConfig } from "@/Core/Config"

export function main() {
	const server = Server.create()
	Server.run(server, ServerConfig.port)
}

main()