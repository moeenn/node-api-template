import { Service } from "typedi"
import { Request, RouteOptions } from "./Server"

@Service()
export default class Controller {
  public index(): RouteOptions {
    const handler = async (): Promise<unknown> => {
      return { hello: "world" }
    }

    return { handler }
  }

  public create(): RouteOptions {
    const schema = {
      body: {
        type: "object",
        required: ["username", "email"],
        properties: {
          username: { type: "string" },
          email: { type: "string" },
        },
      },
    }

    const handler = async (request: Request): Promise<unknown> => {
      return request.body
    }

    return { schema, handler }
  }
}