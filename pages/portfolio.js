import { client } from '../libs/client';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Portfolio({ portfolio }) {
  return (
    <Layout title="portfolio">
      <>
        <p className="text-3xl my-8 text-black">制作物一覧</p>
        <div className="flex w-10/12 justify-center flex-wrap content-between">
          {portfolio.map((portfolio) => {
            // const maxLength = 30;
            // if (portfolio.title.length > maxLength) {
            //   portfolio.title = portfolio.title.substr(0, maxLength) + '...';
            // } else {
            //   portfolio.title = portfolio.title;
            // }
            return (
              <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
                <div className="text-center m-6 flex h-20 w-80 rounded-3xl">
                  <div className="h-20 w-20">
                    <Image
                      className="rounded-3xl"
                      src={portfolio.image.url}
                      width={80}
                      height={80}
                      objectFit="cover"
                      alt="portfolioimg"
                    />
                  </div>
                  <div className="px-4 w-56">
                    <p className="text-sm text-left font-bold">{portfolio.title}</p>
                    <div className="flex pl-2 mt-1 justify-between items-center">
                      <div className="h-7 p-1 w-52 text-left text-xs text-gray-500">{portfolio.date}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </>
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
