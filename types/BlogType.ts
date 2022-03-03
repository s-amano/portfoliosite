import { MicroCMSType, ImageType, TagType } from ".";

export interface BlogType extends MicroCMSType {
  title: string;
  body: string;
  image: ImageType;
  tags?: TagType[];
}
