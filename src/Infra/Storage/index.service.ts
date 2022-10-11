import AWS from "aws-sdk"
import { IStorageService } from "./index.types"

export class StorageService implements IStorageService {
  private bucketName: string
  private s3Instance: AWS.S3

  public constructor(bucketName: string, keyID: string, secret: string) {
    this.bucketName = bucketName
    this.s3Instance = new AWS.S3({
      accessKeyId: keyID,
      secretAccessKey: secret,
    })
  }

  /**
   *  add a new file to the storage
   *
   */
  public async save(filename: string, content: Buffer): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: filename,
      Body: content,
    }

    const result = await this.s3Instance.upload(params).promise()
    return result.Location
  }

  /**
   *  remove a file from storage
   *
   */
  public async remove(fileURL: string): Promise<AWS.S3.DeleteObjectOutput> {
    const filename = fileURL.split("/").at(-1)
    if (!filename) {
      throw new Error(`invalid filename: ${filename}`)
    }

    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: filename,
    }

    return await this.s3Instance.deleteObject(params).promise()
  }
}
