export const serverConfig = {
  /* dont change otherwise dockerization will be problematic */
  host: "0.0.0.0",
  port: 5000,

  /* global: max requests to allow per IP during each time window */
  rateLimit: {
    max: 100,
    timeWindow: 60000 /* 1 minute i.e. 1000 ms * 60 */,
  },
}
