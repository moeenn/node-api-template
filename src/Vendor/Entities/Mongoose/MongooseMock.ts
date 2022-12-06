import { IMongoose } from "./IMongoose"

export class MongooseMock implements IMongoose {
  private uri = ""

  public connect(URI: string) {
    this.uri = URI
  }

  get URI(): string {
    return this.uri
  }
}
