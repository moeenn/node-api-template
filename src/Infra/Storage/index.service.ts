import AWS from "aws-sdk"

export class StorageService {
  private bucket_name: string
  private s3_instance: AWS.S3

  public constructor(bucketName: string, keyID: string, secret: string) {
    this.bucket_name = bucketName
    this.s3_instance = new AWS.S3({
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
      Bucket: this.bucket_name,
      Key: filename,
      Body: content,
    }

    const result = await this.s3_instance.upload(params).promise()
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
      Bucket: this.bucket_name,
      Key: filename,
    }

    return await this.s3_instance.deleteObject(params).promise()
  }
}
