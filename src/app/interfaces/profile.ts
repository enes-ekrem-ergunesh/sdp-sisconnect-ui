import {User} from "./user";
import {ProfileField} from "./profile-field";

export interface Profile {
  id: number;
  user: User;
  admin_blocked_by: User;
  admin_blocked_at: Date;
  profile_fields: ProfileField[];
}
