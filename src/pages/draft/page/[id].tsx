import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import Link from "next/link";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { BlogType } from "types";
import { client } from "@/libs/client";
import { Pagination } from "@/components/Pagination";
import { Layout } from "@/components/Layout";

interface Props {
  draft: BlogType[];
  totalCount: number;
  currentPageNumber: number;
}

const PER_PAGE = 10;

export const DraftPageId: NextPage<Props> = (props: Props) => {
  const { draft, totalCount, currentPageNumber } = props;
  return (
    <Layout pageTitle="DraftPage" noindex={true}>
      <>
        <div className="w-screen">
          <div className="mt-8 mx-4 text-center">
            <p className="text-4xl text-black mb-2">Draft</p>
            <p>公開するほどでもない下書き記事とかポエム記事とか日記とか。</p>
            <p>※本ページと記事の一部はnoindex指定をしています。</p>
          </div>
          <div className="flex flex-col justify-center items-center mx-4 mt-4">
            {draft.map((draft) => {
              const maxLength = 200;
              if (draft.title.length > maxLength) {
                draft.title = draft.title.substring(0, maxLength) + "...";
              } else {
                draft.title = draft.title;
              }

              return (
                <div key={draft.id} className="m-3 md:w-1/2 w-full">
                  <Link href={`/draft/${draft.id}`}>
                    <a>
                      <div className="ml-2 px-3 justify-around flex flex-col w-full">
                        <span className="flex items-center">
                          <BsFillCalendarEventFill className="mr-1" />
                          <p className="text-sm text-gray-500">
                            {draft.publishedAt.substring(0, 10)}
                          </p>
                        </span>
                        <div className="w-full">
                          <p className="text-left text-black">{draft.title}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <Pagination
              currentPageNumber={currentPageNumber}
              maxPageNumber={Math.ceil(totalCount / PER_PAGE)}
              whatPage={"draft"}
            />
          </div>
        </div>
      </>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const data = await client.get({
    endpoint: "blogs",
    queries: { filters: `isDraftBlog[equals]true` },
  });

  const { totalCount } = data;
  const paths = range(1, Math.ceil(totalCount / PER_PAGE)).map((i) => `/draft/page/${i}`);
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
  const queries = { offset: offset, limit: limit, filters: `isDraftBlog[equals]true` };
  const data = await client.get({
    endpoint: "blogs",
    queries: queries,
  });

  return {
    props: {
      draft: data.contents,
      totalCount: Number(data.totalCount),
      currentPageNumber: numId,
    },
  };
};

export default DraftPageId;
