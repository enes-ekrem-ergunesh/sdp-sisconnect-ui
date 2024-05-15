import {User} from "./user";

export interface Notification {
  id: number;
  receiver: User;
  notification_type_id: number;
  notification_type_name: string;
  sender: User;
  message: string;
  is_seen: boolean;
  deleted_at: Date;
}
