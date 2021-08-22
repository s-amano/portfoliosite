import { client } from '../libs/client';
import Layout from '../components/Layout';
import Contents from '../components/Contents';

export default function Portfolio({ portfolio }) {
  return (
    <Layout title="portfolio">
      <Contents contents={portfolio} contentName={'portfolio'} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const offset = 0;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: 'portfolio', queries: queries });
  return {
    props: {
      portfolio: data.contents,
      totalCount: data.totalCount,
    },
  };
};
