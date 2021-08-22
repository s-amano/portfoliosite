import { client } from '../../../libs/client';
import Layout from '../../../components/Layout';
import Contents from '../../../components/Contents';
import { Pagination } from '../../../components/Pagination';

export default function BlogPageId({ blog, totalCount, currentPageNumber }) {
  return (
    <Layout title="blogpage">
      <Contents contents={blog} contentName={'blogs'} />
      <Pagination currentPageNumber={currentPageNumber} maxPageNumber={Math.ceil(totalCount / 4)} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const data = await client.get({ endpoint: 'blogs' });

  const { totalCount } = data;
  const paths = range(1, Math.ceil(totalCount / 4)).map((i) => `/blogs/page/${i}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const numId = context.params.id;
  const offset = (numId - 1) * 4;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: 'blogs', queries: queries });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      currentPageNumber: numId,
    },
  };
};
