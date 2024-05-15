import {Profile} from "./profile";
import {User} from "./user";

export interface ProfileField {
  id: number;
  profile: Profile;
  data: JSON;
  admin_blocked_by: User;
  admin_blocked_at: Date;
  profile_field_type_id: number;
  profile_field_type_name: string;
  data_type: string;
  deleted_at: Date;
}
