import StorageService from "./index.service"
import { StorageConfig } from "@/Application/Config/StorageConfig"

function init(): StorageService {
  const { key, secret, bucket } = StorageConfig
  return new StorageService(bucket, key, secret)
}

export default init()
export { IFile } from "./index.types"