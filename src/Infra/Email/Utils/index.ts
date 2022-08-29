import ejs, { Data } from "ejs"
import fs from "fs/promises"
import { EmailConfig } from "@/Application/Config"

/**
 *  read the template from emails folder and render it with the provided data
 * 
*/
export async function renderTemplate(template: string, params: Data): Promise<string> {
  const templatesFolder = EmailConfig.templates_folder
  const templatePath = `${process.cwd()}/${templatesFolder}/${template}.ejs`

  const content: string = await fs.readFile(templatePath, { 
    encoding: "utf8" 
  })

  const html: string = ejs.render(content, params)
  return html
}