import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { BlogList } from "@/components/BlogList";

const BlogsSearchPage: React.FC = () => {
  const router = useRouter();
  const [blogsQuery, setBlogsQuery] = useState<string | null>(null);

  useEffect(() => {
    const { keyword } = router.query;
    setBlogsQuery(keyword && typeof keyword === "string" ? keyword : null);
  }, [router.query]);

  async function fetcher(url: string) {
    const response = await fetch(url);
    return response.json();
  }

  const { data, error } = useSWR(`/api/searchBlogs?keyword=${encodeURI(blogsQuery)}`, fetcher);

  return (
    <Layout>
      <>
        <p className="text-3xl m-8 text-black">
          「{blogsQuery ? blogsQuery : ""}」 の検索結果 (
          {data ? String(data.blogs.contents.length) : "0"}件)
        </p>
        {data ? (
          <div className="flex items-center flex-col md:w-[70%] mt-4">
            <BlogList blogs={data.blogs.contents} />
          </div>
        ) : (
          <></>
        )}
      </>
    </Layout>
  );
};

export default BlogsSearchPage;
