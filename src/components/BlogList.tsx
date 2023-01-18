import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogType } from "../../types";
import { BsFillCalendarEventFill } from "react-icons/bs";

interface Props {
  blogs: BlogType[];
}

export const BlogList: React.FC<Props> = ({ blogs }) => {
  return (
    <>
      <div className="flex flex-col justify-center w-[95%]">
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
                <div className="text-center m-3 flex rounded-3xl w-full">
                  <div>
                    <Image
                      className="rounded-3xl"
                      src={blog.image.url}
                      width={256}
                      height={256}
                      objectFit="cover"
                      alt="blogimg"
                    />
                  </div>

                  <div className="ml-2 px-3 justify-around flex flex-col w-full">
                    <span className="flex items-center">
                      <BsFillCalendarEventFill className="mr-1" />
                      <p className="text-sm text-gray-500">
                        {blog.publishedAt.substring(0, 10)}
                      </p>
                    </span>
                    <div>
                      <p className="text-xl text-left text-black">
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
