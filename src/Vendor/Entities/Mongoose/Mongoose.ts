import { Service } from "typedi"
import mongoose from "mongoose"
import { IMongoose } from "./IMongoose"

/**
 *  side-effect class
 *
 */
@Service()
export class Mongoose implements IMongoose {
  connect(URI: string) {
    mongoose.connect(URI)
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:"),
    )
  }
}
