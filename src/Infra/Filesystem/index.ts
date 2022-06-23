import {Service} from "typedi"
import fs from "fs/promises"

export interface IFilesystem {
  listDirectory: (path: string) => Promise<string[]>
}

@Service()
export default class Filesystem implements IFilesystem {
  async listDirectory(path: string): Promise<string[]> {
    return fs.readdir(path)
  }
}