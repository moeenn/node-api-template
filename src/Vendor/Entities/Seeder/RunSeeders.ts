import "reflect-metadata"
import "module-alias/register"
import { Container } from "typedi"
import { SeedRunner } from "./SeedRunner"

async function run() {
  const runner = Container.get(SeedRunner)
  await runner.seed()
}

run().catch(console.error)
