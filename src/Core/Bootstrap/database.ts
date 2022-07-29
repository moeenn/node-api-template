import mongoose from "mongoose"
import { env } from "@/Core/Helpers"

function getConnectionURI(): string {
  const c = {
    host: env("MONGO_HOST"),
    port: env("MONGO_PORT"),
    db: env("MONGO_DATABASE"),
    username: env("MONGO_USERNAME"),
    password: env("MONGO_PASSWORD"),
  }

  return `mongodb://${c.username}:${c.password}@${c.host}:${c.port}/${c.db}`
}

function init() {
  const URI = getConnectionURI()

  mongoose.connect(URI)
  mongoose
    .connection
    .on("error", console.error.bind(console, "MongoDB connection error:"))
}

export default init()