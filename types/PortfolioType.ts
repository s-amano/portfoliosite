import { MicroCMSType, ImageType } from ".";

export interface PortfolioType extends MicroCMSType {
  title: string;
  body: string;
  image: ImageType;
  date: string;
}
