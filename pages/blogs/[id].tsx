import { GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import { client } from "../../libs/client";
import { Layout } from "../../components/Layout";
import Seo from "../../components/Seo";
import Image from "next/image";
import Link from "next/link";
import { BlogType } from "types";

interface Props {
  blog: BlogType;
  preview: boolean;
}

export const BlogId: NextPage<Props> = (props: Props) => {
  const { blog, preview } = props;
  const tagsComponent = useMemo(() => {
    return (
      blog.tags &&
      blog.tags.map((tag) => {
        return (
          <div key={tag.id} className="pt-2 mr-1">
            <Link href={`/tags/${tag.id}`}>
              <a className="text-blue-500 hover:bg-gray-500 p-2 rounded">
                #{tag.name}
              </a>
            </Link>
          </div>
        );
      })
    );
  }, [blog]);
  return (
    <Layout pageTitle="blog">
      <>
        {preview && (
          <p className={"bg-yellow-100 text-yellow-900 p-4 text-center"}>
            プレビュー表示がONになっています。
            <Link href={`/api/exitPreview?id=${blog.id}`}>
              <a className="underline">プレビュー表示をOFFにする</a>
            </Link>
          </p>
        )}
        <Seo
          pageTitle={blog.title}
          pageDescription={blog.body}
          pageImg={blog.image.url}
          pageImgWidth={1280}
          pageImgHeight={960}
        />
        <div className="mx-8 mt-6 flex flex-1 justify-center items-center flex-col w-screen max-w-2xl">
          <div className="border-b-2 border-gray-700 mt-8 my-8 mb-6">
            <p className="text-3xl">{blog.title}</p>
          </div>

          <div className="flex pl-2 items-center w-10/12 justify-end">
            {tagsComponent}
          </div>

          <div className="mt-6 mx-4">
            <Image
              className="rounded-3xl"
              src={blog.image.url}
              width={400}
              height={300}
            ></Image>
          </div>

          <div
            style={{ marginRight: "5%", marginLeft: "5%" }}
            className="my-8 shadow-inner rounded-xl bg-white p-6 max-w-full"
          >
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: `${blog.body}`,
              }}
            />
          </div>
        </div>
      </>
    </Layout>
  );
};

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === "string");

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/blogs/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context
): Promise<{
  props: Props;
}> => {
  const id = context.params.id;

  const draftKey = isDraft(context.previewData)
    ? { draftKey: context.previewData.draftKey }
    : {};

  const data =
    typeof id === "string"
      ? await client.get({
          endpoint: "blogs",
          contentId: id,
          queries: draftKey,
        })
      : null;

  const preview = draftKey.draftKey ? true : false;

  return {
    props: {
      blog: data,
      preview: preview,
    },
  };
};

export default BlogId;
