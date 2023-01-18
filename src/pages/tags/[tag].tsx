import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import React from "react";
import { client } from "../../../libs/client";
import { Layout } from "../../components/Layout";
import { Contents } from "../../components/Contents";
import { Pagination } from "../../components/Pagination";
import { BlogType, TagType } from "types";

interface Props {
  blogs: BlogType[];
  tag: TagType;
  totalCount: number;
}

export const TagId: NextPage<Props> = (props: Props) => {
  const { blogs, totalCount, tag } = props;
  return (
    <Layout pageTitle={`tags: ${tag}`}>
      <>
        <div className="flex mt-12">
          <p className="text-3xl text-blue-500">#{tag.name}</p>{" "}
          <p className="text-3xl text-black mb-4">一覧</p>
        </div>
        <Contents contents={blogs} contentName={"blogs"} />
        <Pagination
          currentPageNumber={1}
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
  const data = await client.get({ endpoint: "tags", queries: { limit: 100 } });

  const paths = data.contents.map((content) => `/tags/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: Props;
}> => {
  const tagId = context.params.tag;
  const offset = 0;
  const limit = 4;
  const queries = {
    offset: offset,
    limit: limit,
    filters: `tags[contains]${tagId}`,
  };
  const data = await client.get({
    endpoint: "blogs",
    queries: queries,
  });

  const tag =
    typeof tagId === "string"
      ? await client.get({
          endpoint: "tags",
          contentId: tagId,
        })
      : null;

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
      tag: tag,
    },
  };
};

export default TagId;
