import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogType } from "../types";

interface Props {
  blogs: BlogType[];
}

export const BlogList: React.FC<Props> = ({ blogs }) => {
  return (
    <>
      <div className="flex flex-col justify-center">
        {blogs.map((blog) => {
          const maxLength = 40;
          const maxBodyLength = 70;
          var blogBody = blog.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
          if (blog.title.length > maxLength) {
            blog.title = blog.title.substring(0, maxLength) + "...";
          } else {
            blog.title = blog.title;
          }
          if (blogBody.length > maxBodyLength) {
            blogBody = blogBody.substring(0, maxBodyLength) + "...";
          } else {
            blogBody = blogBody;
          }
          return (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <a>
                <div className="text-center m-4 flex rounded-3xl">
                  <Image
                    className="rounded-3xl"
                    src={blog.image.url}
                    width={256}
                    height={256}
                    objectFit="cover"
                    alt="blogimg"
                  />

                  <div className="ml-3 px-4 justify-around flex flex-col w-full">
                    <div>
                      <p className="text-sm text-left text-gray-400">
                        {blog.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl text-left text-black">
                        {blog.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-left text-gray-500">{blogBody}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};

BlogList.displayName = "BlogList";
