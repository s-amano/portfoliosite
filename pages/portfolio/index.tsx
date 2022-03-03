import { GetStaticProps, NextPage } from "next";
import { client } from "../../libs/client";
import { Layout } from "../../components/Layout";
import { Contents } from "../../components/Contents";
import { Pagination } from "../../components/Pagination";
import { PortfolioType } from "types";

interface Props {
  portfolio: PortfolioType[];
  totalCount: number;
}

export const Portfolio: NextPage<Props> = ({ portfolio, totalCount }) => {
  return (
    <Layout pageTitle="portfolio">
      <>
        <p className="text-3xl mt-8 text-black">制作物一覧</p>
        <Contents contents={portfolio} contentName={"portfolio"} />
        <Pagination
          currentPageNumber={1}
          maxPageNumber={Math.ceil(totalCount / 4)}
          whatPage={"portfolio"}
        />
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
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

export default Portfolio;
