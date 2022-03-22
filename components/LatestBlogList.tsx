import React from "react";
import { BlogType } from "../types";
import Link from "next/link";

interface Props {
  latestBlog: BlogType[];
}

export const LatestBlogList: React.FC<Props> = React.memo((props: Props) => {
  const { latestBlog } = props;
  return (
    <div className="shadow-inner rounded-xl bg-white p-4 mt-4 sticky top-0">
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
  );
});

LatestBlogList.displayName = "LatestBlogList";
