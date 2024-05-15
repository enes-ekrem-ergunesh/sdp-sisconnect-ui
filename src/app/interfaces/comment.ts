import {User} from "./user";
import {Post} from "./post";

export interface Comment {
  id: number;
  user: User;
  parent: Comment;
  post: Post;
  content: string;
  admin_blocked_by: User;
  admin_blocked_at: Date;
  deleted_at: Date;
}
