import pino from "pino"
import { Service } from "typedi"

@Service()
export class Logger {
  public readonly instance = pino()
}
