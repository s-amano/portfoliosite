import { GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import Link from "next/link";
import useMedia from "use-media";
import { client } from "../../libs/client";
import { Layout } from "../../components/Layout";
import { BlogType, TagType } from "types";
import { BlogIdComponent } from "@/components/BlogIdComponent";
import { SidebarWrapLayout } from "@/components/SidebarWrapLayout";

interface Props {
  blog: BlogType;
  latestDataBlog: BlogType[];
  preview: boolean;
  tags: TagType[];
}

export const BlogId: NextPage<Props> = (props: Props) => {
  const { blog, preview, latestDataBlog, tags } = props;
  const isWide = useMedia({ minWidth: "700px" });
  const tagsComponent = useMemo(() => {
    return (
      blog.tags &&
      blog.tags.map((tag) => {
        return (
          <div key={tag.id} className="pt-2 mr-1">
            <Link href={`/tags/${tag.id}`}>
              <a className="text-blue-500 hover:bg-gray-500 p-2 rounded">#{tag.name}</a>
            </Link>
          </div>
        );
      })
    );
  }, [blog]);

  const sortedTag = useMemo(() => {
    return tags.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }, [tags]);

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
        {isWide ? (
          <SidebarWrapLayout latestDataBlog={latestDataBlog} sortedTag={sortedTag}>
            <BlogIdComponent blog={blog} tagsComponent={tagsComponent} />
          </SidebarWrapLayout>
        ) : (
          <BlogIdComponent blog={blog} tagsComponent={tagsComponent} />
        )}
      </>
    </Layout>
  );
};

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === "string");

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: "blogs",
    queries: { filters: `isDraftBlog[equals]false` },
  });

  const paths = data.contents.map((content) => `/blogs/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context,
): Promise<{
  props: Props;
}> => {
  const id = context.params.id;

  const draftKey = isDraft(context.previewData) ? { draftKey: context.previewData.draftKey } : {};

  const data =
    typeof id === "string"
      ? await client.get({
          endpoint: "blogs",
          contentId: id,
          queries: draftKey,
        })
      : null;

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
    }),
  );

  const latestDataBlog = await client.get({
    endpoint: "blogs",
    queries: { limit: 8 },
  });

  const preview = draftKey.draftKey ? true : false;

  return {
    props: {
      blog: data,
      latestDataBlog: latestDataBlog.contents,
      preview: preview,
      tags: tags,
    },
  };
};

export default BlogId;
