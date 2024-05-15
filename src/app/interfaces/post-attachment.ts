import {Post} from "./post";
import {User} from "./user";
import {PostAttachmentType} from "./post-attachment-type";
import {PostAttachmentTypeExtension} from "./post-attachment-type-extension";

export interface PostAttachment {
  id: number;
  post: Post;
  name: string;
  url: string;
  post_attachment_type: PostAttachmentType;
  post_attachment_type_extensions: PostAttachmentTypeExtension[];
  admin_blocked_by: User;
  admin_blocked_at: Date;
  deleted_at: Date;
}
