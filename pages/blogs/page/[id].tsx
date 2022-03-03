import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "../../../libs/client";
import { Layout } from "../../../components/Layout";
import { Contents } from "../../../components/Contents";
import { Pagination } from "../../../components/Pagination";
import { BlogType } from "types";

interface Props {
  blog: BlogType[];
  totalCount: number;
  currentPageNumber: number;
}

export const BlogPageId: NextPage<Props> = (props: Props) => {
  const { blog, totalCount, currentPageNumber } = props;
  return (
    <Layout pageTitle="blogPagination">
      <>
        <p className="text-3xl mt-8 text-black">ブログ一覧</p>
        <Contents contents={blog} contentName={"blogs"} />
        <Pagination
          currentPageNumber={currentPageNumber}
          maxPageNumber={Math.ceil(totalCount / 4)}
          whatPage={"blogs"}
        />
      </>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const data = await client.get({ endpoint: "blogs" });

  const { totalCount } = data;
  const paths = range(1, Math.ceil(totalCount / 4)).map(
    (i) => `/blogs/page/${i}`
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: Props;
}> => {
  const numId = Number(context.params?.id);
  const offset = (numId - 1) * 4;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: "blogs", queries: queries });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      currentPageNumber: numId,
    },
  };
};

export default BlogPageId;
