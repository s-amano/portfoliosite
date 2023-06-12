import { MicroCMSType } from ".";

export interface ExperienceType extends MicroCMSType {
  title: string;
  position: string;
  jobType: string;
  startAt: string;
  endAt: string;
  work: string;
}
