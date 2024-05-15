import {User} from "./user";

export interface Token {
  id: number;
  token: string;
  user: User;
  valid_until: Date;
  revoked_at: Date;
}
