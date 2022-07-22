import { Context } from "@/Core/Server"
import { User } from "@/Models"

async function All(ctx: Context) {
  ctx.body = await User.find()
} 

export default {
  All,
}