/**
 * all config objects should be re-exported from here. This way, when the whole
 * file is loaded at startup, if any environment variables etc. are missing
 * these errors will propagate at application startup.
 */
export { appConfig } from "./appConfig"
export { serverConfig } from "./serverConfig"
export { authConfig } from "./authConfig"
export { emailConfig } from "./emailConfig"
