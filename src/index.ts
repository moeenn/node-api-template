import "module-alias/register"
import Server from "@src/Infra/HTTP/Server"
import Application from "@src/Application"
import Env from "@src/Application/Config/Env"

function main(): void {
	Application.Bootstrap()

	const port = Env.Read("SERVER_PORT")
	const server = Server.Create()

	Server.Run(server, port)
}

main()
