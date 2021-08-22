import { client } from '../libs/client';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import Contents from '../components/Contents';

export default function Home({ blog }) {
  return (
    <Layout title="Home">
      <ProfileCard />
      <Contents contents={blog} contentName={'blogs'} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const offset = 0;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: 'blogs', queries: queries });
  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};
