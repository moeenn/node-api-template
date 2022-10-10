import { StorageService } from "./index.service"
import { StorageConfig } from "@/Application/Config/StorageConfig"

function init(): StorageService {
  const { key, secret, bucket } = StorageConfig
  return new StorageService(bucket, key, secret)
}

export const StorageServiceInstance = init()
export { IFile } from "./index.types"
