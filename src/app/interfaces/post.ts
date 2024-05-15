import {User} from "./user";
import {PostInteraction} from "./post-interaction";
import {PostAttachment} from "./post-attachment";
import {Comment} from "./comment";

export interface Post {
  id: number;
  user: User;
  content: string;
  admin_blocked_by: User;
  admin_blocked_at: Date;
  visibility_id: number;
  visibility_name: string;
  post_interactions: PostInteraction[];
  post_attachments: PostAttachment[];
  comments: Comment[];
  deleted_at: Date;
}
