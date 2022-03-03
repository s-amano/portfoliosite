import { client } from "../../../../libs/client";
import { Layout } from "../../../../components/Layout";
import { Contents } from "../../../../components/Contents";
import { Pagination } from "../../../../components/Pagination";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BlogType, TagType } from "types";

interface Props {
  blogs: BlogType[];
  tag: TagType;
  totalCount: number;
  currentPageNumber: number;
}

export const tagPageId: NextPage<Props> = (props: Props) => {
  const { blogs, tag, totalCount, currentPageNumber } = props;
  return (
    <Layout pageTitle="blogPageFilteredByTag">
      <>
        <div className="flex">
          <p className="text-3xl text-blue-500">#{tag.name}</p>{" "}
          <p className="text-3xl text-black mb-4">一覧</p>
        </div>
        <Contents contents={blogs} contentName={"blogs"} />
        <Pagination
          currentPageNumber={currentPageNumber}
          maxPageNumber={Math.ceil(totalCount / 4)}
          whatPage={"tags"}
          tagId={tag.id}
        />
      </>
    </Layout>
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await client.get({ endpoint: "tags", queries: { limit: 100 } });

  const resPaths = await Promise.all(
    tags.contents.map((tag) => {
      const result = client
        .get({
          endpoint: "blogs",
          queries: {
            filters: `tags[contains]${tag.id}`,
            limit: 100,
          },
        })
        .then(({ totalCount }) => {
          const range = (start, end) =>
            [...Array(end - start + 1)].map((_, i) => start + i);

          return range(1, Math.ceil(totalCount / 4)).map(
            (i) => `/tags/${tag.id}/page/${i}`
          );
        });
      return result;
    })
  );
  const paths = resPaths.flat();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: Props;
}> => {
  const numId = Number(context.params?.id);
  const tagId = context.params.tag;
  const offset = (numId - 1) * 4;
  const limit = 4;
  const queries = {
    offset: offset,
    limit: limit,
    filters: `tags[contains]${tagId}`,
  };
  const data = await client.get({ endpoint: "blogs", queries: queries });
  const tag =
    typeof tagId === "string"
      ? await client.get({ endpoint: "tags", contentId: tagId })
      : null;

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
      currentPageNumber: numId,
      tag: tag,
    },
  };
};

export default tagPageId;
