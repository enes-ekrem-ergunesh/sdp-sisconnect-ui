import {User} from "./user";
import {Post} from "./post";

export interface PostInteraction {
  id: number;
  user: User;
  post: Post;
  post_interaction_type_id: number;
  post_interaction_type_name: string;
  deleted_at: Date;
}
