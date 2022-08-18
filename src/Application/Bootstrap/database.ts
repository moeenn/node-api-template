import mongoose from "mongoose"
import { DatabaseConfig as c } from "@/Application/Config"

function getConnectionURI(): string {
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