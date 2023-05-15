import "module-alias/register"
import { seedRunner } from "./seedRunner"

/* eslint-disable-next-line no-console */
seedRunner().catch(console.error)
