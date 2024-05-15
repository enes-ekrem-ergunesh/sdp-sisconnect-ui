import {User} from "./user";

export interface Connection {
  id: number;
  user: User;
  connected_user: User;
  accepted_at: Date;
  blocked: boolean;
  deleted_at: Date;
}
