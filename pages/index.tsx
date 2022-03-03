import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { Layout } from "../components/Layout";
import { ProfileCard } from "../components/ProfileCard";
import { Contents } from "../components/Contents";
import { Pagination } from "../components/Pagination";
import { BlogType } from "types";

interface Props {
  blog: BlogType[];
  totalCount: number;
}

export const Home: NextPage<Props> = (props: Props) => {
  const { blog, totalCount } = props;
  return (
    <Layout pageTitle="home">
      <>
        <ProfileCard />
        <p className="text-3xl mt-8 text-black">ブログ一覧</p>
        <Contents contents={blog} contentName={"blogs"} />
        <Pagination
          currentPageNumber={1}
          maxPageNumber={Math.ceil(totalCount / 4)}
          whatPage={"blogs"}
        />
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

export default Home;
