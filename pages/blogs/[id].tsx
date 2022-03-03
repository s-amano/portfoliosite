import { GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import { client } from "../../libs/client";
import { Layout } from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { BlogType } from "types";
import { BlogIdComponent } from "components/BlogIdComponent";

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
        <div className="flex justify-center md:max-w-[1024px] xl:max-w-[1224px]  mt-20">
          <div className="flex flex-col md:w-2/3 xl:w-3/4">
            <BlogIdComponent blog={blog} tagsComponent={tagsComponent} />
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

export const getStaticProps: GetStaticProps = async (
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
