import React, { useMemo } from "react";
import { BlogType, TagType } from "types";
import { BlogSidebar } from "./BlogSidebar";

interface Props {
  children: JSX.Element;
  latestDataBlog: BlogType[];
  sortedTag: TagType[];
}

export const SidebarWrapLayout: React.FC<Props> = React.memo((props: Props) => {
  const { children, latestDataBlog, sortedTag } = props;
  return (
    <div className="flex flex-start mx-auto md:max-w-[1024px] xl:max-w-[1224px]">
      {children}
      <div className="md:w-1/3 xl:w-1/4">
        <BlogSidebar latestBlog={latestDataBlog} sortedTag={sortedTag} />
      </div>
    </div>
  );
});

SidebarWrapLayout.displayName = "SidebarWrapLayout";
