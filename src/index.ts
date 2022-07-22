import "module-alias/register"
import "@/Core/Bootstrap"
import { env } from "@/Core/Helpers"
import Server from "@/Core/Server"

export function main() {
	const server = Server.create()
	Server.run(server, env("SERVER_PORT"))
}

main()