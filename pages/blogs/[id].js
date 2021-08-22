import { client } from '../../libs/client';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Image from 'next/image';

export default function BlogId({ blog }) {
  return (
    <Layout title="blog">
      <Seo
        pageTitle={blog.title}
        pageDescription={blog.body}
        pageImg={blog.image.url}
        pageImgWidth={1280}
        pageImgHeight={960}
      />
      <div className="mx-8 my-6 flex flex-1 justify-center items-center flex-col w-screen max-w-2xl">
        <div className="border-b-2 border-gray-700 m-8">
          <p className="text-3xl">{blog.title}</p>
        </div>

        <div className="mt-6 mx-4">
          <Image className="rounded-3xl" src={blog.image.url} width={400} height={300}></Image>
        </div>

        <div
          style={{ marginRight: '5%', marginLeft: '5%' }}
          className="my-8 shadow-inner rounded-xl bg-white p-6 max-w-full"
        >
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blogs' });

  const paths = data.contents.map((content) => `/blogs/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blogs', contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
