import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useMedia from "use-media";
import { useMemo } from "react";
import { client } from "../../../libs/client";
import { Layout } from "../../../components/Layout";
// import { Contents } from "../../../components/Contents";
import { Pagination } from "../../../components/Pagination";
import { BlogType, TagType } from "types";
import { BlogList } from "@/components/BlogList";
import { SidebarWrapLayout } from "@/components/SidebarWrapLayout";
import { MobileBlogList } from "@/components/MobileBlogList";

interface Props {
  blog: BlogType[];
  totalCount: number;
  currentPageNumber: number;
  tags: TagType[];
  latestDataBlog: BlogType[];
}

const PER_PAGE = 8;

export const BlogPageId: NextPage<Props> = (props: Props) => {
  const { blog, totalCount, currentPageNumber, tags, latestDataBlog } = props;

  const isWide = useMedia({ minWidth: "700px" });
  const sortedTag = useMemo(() => {
    return tags.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }, [tags]);

  const memorizedBlogList = useMemo(
    () => (
      <>
        <BlogList blogs={blog} />
        <Pagination
          currentPageNumber={currentPageNumber}
          maxPageNumber={Math.ceil(totalCount / PER_PAGE)}
          whatPage={"blogs"}
        />
      </>
    ),
    [blog, currentPageNumber, totalCount],
  );

  return (
    <Layout pageTitle="blogPagination">
      <>
        <div className="w-screen">
          <div className="mt-16 mx-4">
            <p className="text-center text-4xl text-black">BLOG</p>
          </div>

          {isWide ? (
            <SidebarWrapLayout latestDataBlog={latestDataBlog} sortedTag={sortedTag}>
              {memorizedBlogList}
            </SidebarWrapLayout>
          ) : (
            <div className="flex flex-col justify-center items-center mt-4">
              <MobileBlogList blog={blog} />
              <Pagination
                currentPageNumber={currentPageNumber}
                maxPageNumber={Math.ceil(totalCount / PER_PAGE)}
                whatPage={"blogs"}
              />
            </div>
          )}
        </div>
      </>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const data = await client.get({
    endpoint: "blogs",
    queries: { filters: `isDraftBlog[equals]false` },
  });

  const { totalCount } = data;
  const paths = range(1, Math.ceil(totalCount / PER_PAGE)).map((i) => `/blogs/page/${i}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context,
): Promise<{
  props: Props;
}> => {
  const numId = Number(context.params?.id);
  const offset = (numId - 1) * PER_PAGE;
  const limit = PER_PAGE;
  const queries = { offset: offset, limit: limit, filters: `isDraftBlog[equals]false` };
  const data = await client.get({
    endpoint: "blogs",
    queries: queries,
  });

  const tagData = await await client.get({
    endpoint: "tags",
    queries: { limit: 1000 },
  });

  const tags = await Promise.all(
    tagData.contents.map(async (tag: TagType) => {
      const blog = await await client.get({
        endpoint: "blogs",
        queries: { filters: `tags[contains]${tag.id}[and]isDraftBlog[equals]false` },
      });
      return { ...tag, count: blog.totalCount };
    }),
  );

  const latestDataBlog = await client.get({
    endpoint: "blogs",
    queries: { limit: 8, filters: `isDraftBlog[equals]false` },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: Number(data.totalCount),
      currentPageNumber: numId,
      tags: tags,
      latestDataBlog: latestDataBlog.contents,
    },
  };
};

export default BlogPageId;
