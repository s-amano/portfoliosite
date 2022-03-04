import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogType } from "../types";

interface Props {
  blog: BlogType[];
}

export const MobileBlogList: React.FC<Props> = ({ blog }) => {
  return (
    <>
      <div className="flex flex-col justify-center">
        {blog.map((blog) => {
          const maxLength = 40;

          if (blog.title.length > maxLength) {
            blog.title = blog.title.substring(0, maxLength) + "...";
          } else {
            blog.title = blog.title;
          }

          return (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <a>
                <div className="w-[360px] text-center mb-6 mx-auto flex flex-col bg-white h-96">
                  <div className="">
                    <Image
                      src={blog.image.url}
                      width={360}
                      height={235}
                      objectFit="cover"
                      alt="blogimg"
                    />
                  </div>

                  <div className="px-4 justify-around flex flex-col w-full mt-4">
                    <div>
                      <p className="text-base text-left text-gray-400">
                        {blog.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xl text-left text-gray-600 font-semibold">
                        {blog.title}
                      </p>
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

MobileBlogList.displayName = "MobileBlogList";
