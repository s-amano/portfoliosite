import { client } from "../../libs/client";
import Layout from "../../components/Layout";
import Contents from "../../components/Contents";
import { Pagination } from "../../components/Pagination";

export default function Portfolio({ portfolio, totalCount }) {
  return (
    <Layout title="portfolio">
      <p className="text-3xl mt-8 text-black">制作物一覧</p>
      <Contents contents={portfolio} contentName={"portfolio"} />
      <Pagination
        currentPageNumber={1}
        maxPageNumber={Math.ceil(totalCount / 4)}
        whatPage={"portfolio"}
      />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const offset = 0;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: "portfolio", queries: queries });
  return {
    props: {
      portfolio: data.contents,
      totalCount: data.totalCount,
    },
  };
};
