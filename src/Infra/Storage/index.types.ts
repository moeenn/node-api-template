export interface IStorageService {
  save: (filename: string, content: Buffer) => Promise<string>
  remove: (fileURL: string) => Promise<AWS.S3.DeleteObjectOutput>
}

export interface IFile {
  filepath: string
  newFilename: string
  mimetype: string
}
