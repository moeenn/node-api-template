import joi from "joi"
import { objectId } from "@/Core/Helpers/Validators" 

const toggleApprovedStatus = joi.object({
  user_id: joi.string().custom(objectId, "mongodb object id").required(),
  status: joi.boolean().required(),
})

export default {
  toggleApprovedStatus,
}