import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogType } from "types";

interface Props {
  blog: BlogType;
  tagsComponent: JSX.Element[];
}
export const BlogIdComponent: React.FC<Props> = React.memo((props: Props) => {
  const { blog, tagsComponent } = props;
  return (
    <div className="flex justify-center items-center w-full flex-col md:shadow-inner rounded-xl md:bg-white">
      <div className="flex flex-col justify-center items-center w-11/12">
        <div className="md:m-12 m-4 w-10/12">
          <p className="text-3xl md:text-4xl text-black font-bold">
            {blog.title}
          </p>
        </div>

        <div className="flex pl-2 items-center w-10/12 justify-end">
          {tagsComponent}
        </div>
        <div className="mt-6 mx-4">
          <Image
            className="rounded-3xl"
            src={blog.image.url}
            width={600}
            height={400}
            alt="blogimg"
          ></Image>
        </div>

        <div
          className="prose my-10 px-4 w-full"
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
      </div>
    </div>
  );
});

BlogIdComponent.displayName = "BlogIdComponent";
