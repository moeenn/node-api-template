import "module-alias/register"
import Server from "@src/Application/HTTP/Server"
import { Env } from "@src/Application/Config"

async function main(): Promise<void> {
	const port = Env.Read("SERVER_PORT")
	const server = Server.Create()
	Server.Run(server, port)
}

main()