import { marked } from "marked"

/**
 *  all emails that this system sends must implement this abstract class
 *
 */
export abstract class Email {
	constructor(protected subject: string) {} 
  abstract template(): string

  html(): string {
    const md = this.template()
    return marked.parse(md)
  }
}
