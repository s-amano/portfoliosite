import React from "react";
import Link from "next/link";
import { TagType } from "../../types";
import { FaHashtag } from "react-icons/fa";

interface Props {
  sortedTag: TagType[];
}

export const TagList: React.FC<Props> = React.memo((props: Props) => {
  const { sortedTag } = props;
  return (
    <div className="shadow-inner rounded-xl bg-white p-4 mt-4">
      <div className="flex border-b-2 border-black pt-3 mb-6 pb-2 items-center">
        <FaHashtag size={20} className="mr-1" />
        <p className="text-2xl text-black text-left">タグ一覧</p>
      </div>
      <div className="flex flex-wrap justify-left items-center">
        {sortedTag.map((tag) => {
          return (
            <div className="m-2" key={tag.id}>
              <Link href={`/tags/${tag.id}`}>
                <a className="text-lg text-blue-500 hover:bg-gray-500 rounded">
                  #{tag.name}
                  {`(${tag.count})`}
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
});

TagList.displayName = "TagList";
