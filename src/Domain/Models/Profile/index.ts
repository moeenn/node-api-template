export { ProfileSchema } from "./Profile.repo"
export { IProfile } from "./Profile.types"
import { ProfileActions } from "./Profile.actions"

export const Profile = {
  actions: ProfileActions,
}
