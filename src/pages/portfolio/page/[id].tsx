import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import { client } from "../../../libs/client";
import { Layout } from "../../../components/Layout";
import { Contents } from "../../../components/Contents";
import { Pagination } from "../../../components/Pagination";
import { PortfolioType } from "types";

interface Props {
  portfolio: PortfolioType[];
  totalCount: number;
  currentPageNumber: number;
}

export const PortfolioPageId: NextPage<Props> = (props: Props) => {
  const { portfolio, totalCount, currentPageNumber } = props;
  return (
    <Layout pageTitle="portfolioPagePagination">
      <>
        <p className="text-3xl mt-8 text-black">制作物一覧</p>
        <Contents contents={portfolio} contentName={"portfolio"} />
        <Pagination
          currentPageNumber={currentPageNumber}
          maxPageNumber={Math.ceil(totalCount / 4)}
          whatPage={"portfolio"}
        />
      </>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const data = await client.get({ endpoint: "portfolio" });

  const { totalCount } = data;
  const paths = range(1, Math.ceil(totalCount / 4)).map((i) => `/portfolio/page/${i}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context,
): Promise<{
  props: Props;
}> => {
  const numId = Number(context.params.id);
  const offset = (numId - 1) * 4;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: "portfolio", queries: queries });

  return {
    props: {
      portfolio: data.contents,
      totalCount: data.totalCount,
      currentPageNumber: numId,
    },
  };
};

export default PortfolioPageId;
