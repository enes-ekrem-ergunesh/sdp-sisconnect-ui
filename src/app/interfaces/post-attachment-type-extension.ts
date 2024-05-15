import {PostAttachmentType} from "./post-attachment-type";

export interface PostAttachmentTypeExtension {
  id: number;
  post_attachment_type: PostAttachmentType;
  name: string;
  extension: string;
}
