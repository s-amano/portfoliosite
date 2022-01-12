import { client } from "../libs/client";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ProfileCard from "../components/ProfileCard";
import Contents from "../components/Contents";
import { Pagination } from "../components/Pagination";

export default function Home({ blog, totalCount }) {
  return (
    <Layout title="Home">
      <Seo />
      <ProfileCard />
      <p className="text-3xl mt-8 text-black">ブログ一覧</p>
      <Contents contents={blog} contentName={"blogs"} />
      <Pagination
        currentPageNumber={1}
        maxPageNumber={Math.ceil(totalCount / 4)}
        whatPage={"blogs"}
      />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const offset = 0;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: "blogs", queries: queries });
  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};
