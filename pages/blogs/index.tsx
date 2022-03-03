import { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/Layout";
import { Contents } from "../../components/Contents";
import { client } from "../../libs/client";
import { Pagination } from "../../components/Pagination";
import { BlogType, TagType } from "types";
import useMedia from "use-media";
import { BlogIdComponent } from "components/BlogIdComponent";
import { SidebarWrapLayout } from "components/SidebarWrapLayout";
import { useMemo } from "react";
import { BlogList } from "components/BlogList";

interface Props {
  blog: BlogType[];
  totalCount: number;
  tags: TagType[];
  latestDataBlog: BlogType[];
}

const PER_PAGE = 8;

export const BlogPage: NextPage<Props> = (props: Props) => {
  const { blog, totalCount, tags, latestDataBlog } = props;
  const isWide = useMedia({ minWidth: "700px" });
  const sortedTag = useMemo(() => {
    return tags.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }, [tags]);

  return (
    <Layout pageTitle="BlogPage">
      <>
        <div className="w-screen">
          <div className="mt-16 mx-4 mb-16">
            <p className="text-center text-4xl text-black">BLOG</p>
          </div>

          {isWide ? (
            <SidebarWrapLayout
              latestDataBlog={latestDataBlog}
              sortedTag={sortedTag}
            >
              <div className="flex items-center flex-col mt-4 md:w-2/3 xl:w-3/4">
                <BlogList blogs={blog} />
                <Pagination
                  currentPageNumber={1}
                  maxPageNumber={Math.ceil(totalCount / PER_PAGE)}
                  whatPage={"blogs"}
                />
              </div>
            </SidebarWrapLayout>
          ) : (
            <Pagination
              currentPageNumber={1}
              maxPageNumber={Math.ceil(totalCount / PER_PAGE)}
              whatPage={"blogs"}
            />
          )}
        </div>
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const offset = 0;
  const limit = PER_PAGE;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: "blogs", queries: queries });

  const tagData = await await client.get({
    endpoint: "tags",
    queries: { limit: 1000 },
  });

  const tags = await Promise.all(
    tagData.contents.map(async (tag: TagType) => {
      const blog = await await client.get({
        endpoint: "blogs",
        queries: { filters: `tags[contains]${tag.id}` },
      });
      return { ...tag, count: blog.totalCount };
    })
  );

  const latestDataBlog = await client.get({
    endpoint: "blogs",
    queries: { limit: 8 },
  });
  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      tags: tags,
      latestDataBlog: latestDataBlog.contents,
    },
  };
};

export default BlogPage;
