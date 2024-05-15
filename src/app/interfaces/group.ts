import {User} from "./user";

export interface Group {
  id: number;
  name: string;
  description: string;
  created_by: User;
  group_type_id: number;
  group_type_name: string;
  deleted_at: Date;
}
