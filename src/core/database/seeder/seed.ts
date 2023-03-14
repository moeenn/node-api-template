import "module-alias/register"
import { seedRunner } from "./seedRunner"
seedRunner().catch(console.error)
