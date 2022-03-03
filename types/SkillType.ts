import { MicroCMSType, ImageType } from ".";

export interface SkillType extends MicroCMSType {
  title: string;
  time: string;
  experience: string;
  supplement: string;
  image: ImageType;
}
