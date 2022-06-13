import "module-alias/register"
import "reflect-metadata"

import { Container } from "typedi"
import Env from "@/Infra/Env"
import Server from "@/Infra/HTTP/Server"

function main(): void {
	const server = Container.get(Server)
	const env = Container.get(Env)
	const port = env.read("SERVER_PORT")

	server.start(
		parseInt(port)
	)
}

main()