import React from "react";
import { BsRecordCircle } from "react-icons/bs";
import { ExperienceType } from "types/ExperienceType";
import useMedia from "use-media";

interface Props {
  experience: ExperienceType[];
}

interface DetailsProps {
  experience: ExperienceType;
  isLast: boolean;
}

export const Experience: React.FC<Props> = React.memo((props: Props) => {
  const isWide = useMedia({ minWidth: "768px" });
  const { experience } = props;
  const Details = ({ experience, isLast }: DetailsProps) => {
    return isWide ? (
      <li className="mt-8 mb-2 first:mt-0 last:mb-0 w-full mx-auto flex items-start relative">
        <div className="mr-3 flex">
          <div className="w-1/2 flex justify-start">
            <p className="text-gray-600">
              {experience.startAt.substring(0, 7).replace("-", "/")} ~
              {experience.endAt.substring(0, 7).replace("-", "/")}
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <BsRecordCircle size={42} />
          </div>
          {isLast ? null : (
            <div className="border-gray-400 border-r-2 border-solid absolute top-[40px] left-[103px] h-[98%]"></div>
          )}
        </div>
        <div className="w-full flex flex-col">
          <p className="text-xl font-bold mb-1">{experience.title}</p>
          <div className="flex">
            <p className="text-gray-600 mr-3 mb-1">{experience.position}</p>
          </div>
          <p className="font-medium md:text-sm w-[90%]">{experience.work}</p>
        </div>
      </li>
    ) : (
      <li className="mt-8 mb-2 first:mt-0 last:mb-0 w-full mx-auto flex items-start relative z-10">
        <div className="mr-3 flex z-30">
          <div className="flex justify-center relative z-20">
            <BsRecordCircle size={32} />
          </div>
          {isLast ? null : (
            <div className="border-gray-400 border-r-2 border-solid absolute top-[30px] left-[15px] h-[103%] z-0"></div>
          )}
        </div>
        <div className="w-full flex flex-col">
          <p className="text-lg font-bold">{experience.title}</p>
          <p className="text-gray-800 mr-3">{experience.position}</p>
          <p className="text-xs text-gray-500">
            {experience.startAt.substring(0, 7).replace("-", "/")} ~{" "}
            {experience.endAt.substring(0, 7).replace("-", "/")}
          </p>
          <p className="text-gray-800 font-medium md:text-sm w-[90%]">{experience.work}</p>
        </div>
      </li>
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-white rounded-xl shadow-xl p-8">
      <p className="text-3xl mb-8 font-bold">Experience</p>
      <ul className="w-full flex flex-col items-start justify-between md:ml-4 xs:ml-2">
        {experience.map((experienceItem: ExperienceType, i, { length }) => (
          <Details key={experienceItem.id} experience={experienceItem} isLast={length - 1 === i} />
        ))}
      </ul>
    </div>
  );
});

Experience.displayName = "Experience";
