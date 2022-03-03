import React from "react";
import { BlogType } from "types";
// import { LatestBlogList } from "components/LatestBlogList";
// import { TagList } from "components/TagList";
import { TagType } from "types";
import Link from "next/link";
import Image from "next/image";
import { SnsIcon } from "components/SnsIcon";

interface Props {
  latestBlog: BlogType[];
  sortedTag: TagType[];
}

export const BlogSidebar: React.FC<Props> = React.memo((props: Props) => {
  const { latestBlog, sortedTag } = props;
  return (
    <div className="flex flex-col mt-4">
      <div className="bg-white text-center shadow-xl p-4 rounded-xl w-full">
        <div className="h-36 flex flex-col justify-center">
          <div className="flex">
            <div className="w-1/3 lg:w-28 flex justify-center mr-2">
              <Link href={`/profile`} passHref>
                <a>
                  <Image
                    className="rounded-xl"
                    src={"/nekonew.png"}
                    width={100}
                    height={100}
                    alt="Avatar"
                  />
                </a>
              </Link>
            </div>
            <div className="mt-1 flex flex-col">
              <div>
                <p className="text-lg font-bold text-left">{"tenshin"}</p>

                <p className="text-xs mt-2 text-gray-600 text-left">
                  {"amahaya0831[at]gmail.com"}
                </p>
              </div>
              <SnsIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-inner rounded-xl bg-white p-4 mt-4">
        <p className="border-b-2 border-black text-2xl text-black text-left pt-3 mb-6 pb-2">
          タグ一覧
        </p>
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
      {/* <LatestBlogList blog={blog} /> */}
      <div className="shadow-inner rounded-xl bg-white p-4 mt-4">
        <p className="border-b-2 border-black text-2xl text-black text-left pt-3 mb-6 pb-2">
          最新記事
        </p>
        <div>
          {latestBlog.map((blog) => {
            const maxLength = 30;
            if (blog.title.length > maxLength) {
              blog.title = blog.title.substring(0, maxLength) + "...";
            } else {
              blog.title = blog.title;
            }
            return (
              <Link key={blog.id} href={`/blogs/${blog.id}`} passHref>
                <a>
                  <div className="border-b-2 border-gray-300 mb-6">
                    <p className="text-base text-gray-400">
                      {blog.createdAt.substring(0, 10)}
                    </p>
                    <p className="text-base">{blog.title}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

BlogSidebar.displayName = "BlogSidebar";
