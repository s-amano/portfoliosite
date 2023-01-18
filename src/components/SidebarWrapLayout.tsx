import React from "react";
import { BlogSidebar } from "./BlogSidebar";
import { BlogType, TagType } from "types";

interface Props {
  children: JSX.Element;
  latestDataBlog: BlogType[];
  sortedTag: TagType[];
}

export const SidebarWrapLayout: React.FC<Props> = React.memo((props: Props) => {
  const { children, latestDataBlog, sortedTag } = props;
  return (
    <div className="flex flex-start mx-auto md:max-w-[1024px] mt-16">
      <div className="flex items-center flex-col md:w-[70%] mt-4">{children}</div>
      <div className="md:w-[30%] flex w-full flex-col mt-4">
        <BlogSidebar latestBlog={latestDataBlog} sortedTag={sortedTag} />
      </div>
    </div>
  );
});

SidebarWrapLayout.displayName = "SidebarWrapLayout";
