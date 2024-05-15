import {User} from "./user";
import {Group} from "./group";

export interface Message {
  id: number;
  content: string;
  sender: User;
  group: Group;
  deleted_at: Date;
}
