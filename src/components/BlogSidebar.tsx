import React from "react";
// import Link from "next/link";
import Image from "next/image";
import { TagList } from "./TagList";
import { LatestBlogList } from "./LatestBlogList";
import { SnsIcon } from "@/components/SnsIcon";
import { TagType, BlogType } from "types";
import { SearchInput } from "@/components/SearchInput";

interface Props {
  latestBlog: BlogType[];
  sortedTag: TagType[];
}

export const BlogSidebar: React.FC<Props> = React.memo((props: Props) => {
  const { latestBlog, sortedTag } = props;
  return (
    <>
      <SearchInput />
      <div className="bg-white text-center shadow-xl p-4 rounded-xl w-full">
        <div className="h-36 flex flex-col justify-center">
          <div className="flex">
            <div className="w-1/3 lg:w-28 flex justify-center mr-2">
              {/* <Link href={`/profile`} passHref> */}
              <a>
                <Image
                  className="rounded-xl"
                  src={"/nekonew.png"}
                  width={100}
                  height={100}
                  alt="Avatar"
                />
              </a>
              {/* </Link> */}
            </div>
            <div className="mt-1 flex flex-col">
              <div>
                <p className="text-lg font-bold text-left">{"tenshin"}</p>

                <p className="text-xs mt-2 text-gray-600 text-left">{"amahaya0831[at]gmail.com"}</p>
              </div>
              <SnsIcon />
            </div>
          </div>
        </div>
      </div>
      <TagList sortedTag={sortedTag} />
      <LatestBlogList latestBlog={latestBlog} />
    </>
  );
});

BlogSidebar.displayName = "BlogSidebar";
