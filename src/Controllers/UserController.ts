import { Context } from "@/Core/Server"
import { User } from "@/Models"
import { report } from "@/Core/Helpers"
import schema from "./UserController.schema"

async function All(ctx: Context) {
  ctx.body = await User.find()
}

async function ToggleApprovedStatus(ctx: Context) {
  const { body } = ctx.request
  const { error } = schema.toggleApprovedStatus.validate(body)
  if (error) {
    return report(ctx, {}, error, 422)
  }

  const user = await User.findOne({ _id: body.user_id })
  if (!user) {
    return ctx.throw(401, "invalid user_id")
  }

  const admin = ctx.state["user"] 
  if (admin._id.toString() === user._id.toString()) {
    return ctx.throw(400, "admin cannot disapprove their own account")
  }

  await user.updateOne({ approved: body.status })
  ctx.body = { message: "user approved status updated successfully" }
}

export default {
  All,
  ToggleApprovedStatus,
}