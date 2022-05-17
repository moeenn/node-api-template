import { z } from "zod"

export const EnvironmentSchema = z.object({
  SERVER_HOST: z.string().min(1),
  SERVER_PORT: z.string().min(1),

  DB_HOST: z.string().min(1),
  DB_PORT: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
}).catchall(z.string())

export type IEnvironment = z.infer<typeof EnvironmentSchema>