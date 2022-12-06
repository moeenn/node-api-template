import { Service } from "typedi"
import { DatabaseConfig } from "@/Application/Config"
import { Mongoose } from "@/Vendor/Entities/Mongoose"

@Service()
export class DatabaseBootstrap {
  private config: DatabaseConfig
  private mongoose: Mongoose

  constructor(config: DatabaseConfig, mongoose: Mongoose) {
    this.config = config
    this.mongoose = mongoose
  }

  private getConnectionURI(): string {
    const { username, password, host, port, db } = this.config
    return `mongodb://${username}:${password}@${host}:${port}/${db}`
  }

  public bootstrap() {
    const URI = this.getConnectionURI()
    this.mongoose.connect(URI)
  }
}
