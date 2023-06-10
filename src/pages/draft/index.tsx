import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { Layout } from "@/components/Layout";
import { client } from "@/libs/client";
import { BlogType } from "types";

interface Props {
  draft: BlogType[];
  totalCount: number;
}

const PER_PAGE = 8;

export const DraftPage: NextPage<Props> = (props: Props) => {
  const { draft } = props;
  return (
    <Layout pageTitle="DraftPage" noindex={true}>
      <>
        <div className="w-screen">
          <div className="mt-8 mx-4 text-center">
            <p className="text-4xl text-black mb-2">Draft</p>
            <p>公開するほどでもない下書き記事とかポエム記事とか日記とか。</p>
            <p>※本ページと記事はnoindex指定をしています。</p>
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
          {/* TODO: Pagination実装後にコメントアウトを外す */}
          {/* <div className="flex flex-col justify-center items-center mt-4">
            <Pagination
              currentPageNumber={1}
              maxPageNumber={Math.ceil(totalCount / PER_PAGE)}
              whatPage={"draft"}
            />
          </div> */}
        </div>
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const offset = 0;
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
    },
  };
};

export default DraftPage;
