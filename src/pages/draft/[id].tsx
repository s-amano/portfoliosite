import React from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { DraftIdComponent } from "@/components/DraftIdComponent";
import { Layout } from "@/components/Layout";
import { client } from "@/libs/client";
import { BlogType } from "types";

interface Props {
  draft: BlogType;
  preview: boolean;
}

export const DraftId: NextPage<Props> = (props: Props) => {
  const { draft, preview } = props;
  return (
    <Layout pageTitle="draftId" noindex={true}>
      <>
        {preview && (
          <p className={"bg-yellow-100 text-yellow-900 p-4 text-center"}>
            プレビュー表示がONになっています。
            <Link href={`/api/exitPreview?id=${draft.id}`}>
              <a className="underline">プレビュー表示をOFFにする</a>
            </Link>
          </p>
        )}

        <div className="flex items-center flex-col md:w-[70%] mt-4">
          <DraftIdComponent draft={draft} />
        </div>
      </>
    </Layout>
  );
};

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === "string");

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/draft/${content.id}`);
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

  const preview = draftKey.draftKey ? true : false;

  return {
    props: {
      draft: data,
      preview: preview,
    },
  };
};

export default DraftId;
