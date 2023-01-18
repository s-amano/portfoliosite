import { GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { client } from "../../libs/client";
import { TagType } from "types";

interface Props {
  tags: TagType[];
}

export const Tags: NextPage<Props> = (props: Props) => {
  const { tags } = props;
  const sortedTag = useMemo(() => {
    return tags.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }, [tags]);
  return (
    <Layout pageTitle="tags">
      <div className="mx-8 my-6 flex flex-1 items-center flex-col w-screen max-w-2xl">
        <p className="text-3xl mt-10 mb-6">タグ一覧</p>
        <div className="flex flex-wrap px-4">
          {sortedTag.map((tag) => {
            return (
              <div className="m-3" key={tag.id}>
                <Link href={`/tags/${tag.id}`}>
                  <a className="text-xl text-blue-500 hover:bg-gray-500 rounded">
                    #{tag.name}
                    {`(${tag.count})`}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const data = await client.get({
    endpoint: "tags",
    queries: {
      limit: 100,
    },
  });

  const tags = await Promise.all(
    data.contents.map(async (tag: TagType) => {
      const blog = await client.get({
        endpoint: "blogs",
        queries: { filters: `tags[contains]${tag.id}` },
      });
      return { ...tag, count: blog.totalCount };
    }),
  );

  return {
    props: {
      tags: tags,
    },
  };
};

export default Tags;
