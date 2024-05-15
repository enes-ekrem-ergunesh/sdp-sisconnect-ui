import {Group} from "./group";

export interface UserGroup {
  id: number;
  group: Group;
  is_group_admin: boolean;
  muted_until: Date;
  is_blocked: boolean;
  deleted_at: Date;
}
