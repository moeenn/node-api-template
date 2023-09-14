import { marked } from "marked"
import { appConfig } from "@/app/config"

/**
 * all emails that this system sends must implement this abstract class
 *
 */
export abstract class Email {
  protected readonly appConfig = appConfig
  constructor(public readonly subject: string) {}
  abstract template(): string
  abstract args: unknown

  html(): string {
    const md = this.template().trim()
    return marked.parse(md, { mangle: false, headerIds: false })
  }
}
