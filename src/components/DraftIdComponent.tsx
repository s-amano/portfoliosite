import React from "react";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { BlogType } from "types";

interface Props {
  draft: BlogType;
}

export const DraftIdComponent: React.FC<Props> = React.memo((props: Props) => {
  const { draft } = props;
  return (
    <div className="flex justify-center items-center w-[95%] flex-col md:shadow-inner rounded-xl bg-white">
      <div className="flex flex-col justify-center items-center w-11/12">
        <div className="flex mt-8 w-full justify-start ml-10">
          <span className="flex items-center mr-2">
            <div>
              <BsFillCalendarEventFill className="mr-1 text-gray-500" />
            </div>
            <p className="font-bold text-base text-gray-400 break-words">
              {draft.publishedAt.substring(0, 10)}
            </p>
          </span>
        </div>
        <div className="w-full text-left my-2 ml-8 pb-2 border-b-2 px-2">
          <p className="text-xl md:text-2xl text-black font-bold break-words">{draft.title}</p>
        </div>

        <div
          className="prose my-10 px-4 w-full break-words"
          dangerouslySetInnerHTML={{
            __html: `${draft.body}`,
          }}
        />
      </div>
    </div>
  );
});
