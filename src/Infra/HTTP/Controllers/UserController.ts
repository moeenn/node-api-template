import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { UserService } from "@/Domain/ModelServices"
import { Exception } from "@/Application/Classes"

async function All(ctx: Context) {
  ctx.body = await UserService.getAllUsers()
}

async function ToggleApprovedStatus(ctx: Context) {
  const body = validate(ctx.request.body, {
    user_id: "objectid|required",
    status: "boolean|required",
  })

  const user = await UserService.getUserByID(body.user_id)
  const admin = ctx.state["user"] 
  if (admin._id.toString() === user._id.toString()) {
    throw new Exception("admin cannot disapprove their own account", 400, {
      user_id: user._id.toString(),
    })
  }

  await UserService.toggleUserActiveStatus(user, body.status)
  ctx.body = { message: "user approved status updated successfully" }
}

export default {
  All,
  ToggleApprovedStatus,
}