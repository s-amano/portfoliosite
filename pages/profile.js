import { client } from '../libs/client';
import Layout from '../components/Layout';
import SkillSheet from '../components/SkillSheet';

export default function profile({ skill }) {
  return (
    <Layout title="profile">
      <p className="mt-6 text-3xl text-black">基本情報</p>
      <div style={{ maxWidth: '90%' }} className="bg-white text-left shadow-xl p-6 w-96 rounded-xl m-6">
        <div>
          <p className="font-bold">Name</p>
          <p className="text-xs mt-2 ml-2 text-gray-600">天野心太郎</p>
          <p className="font-bold mt-3">所属</p>
          <p className="text-xs mt-2 ml-2 text-gray-600">慶應義塾大学商学部商学科</p>
          <p className="font-bold mt-3">趣味・好きなもの</p>
          <p className="text-xs mt-2 ml-2 text-gray-600">野球観戦/ミステリー小説・映画/カラオケ/猫</p>
        </div>
      </div>
      <p className="mt-6 text-3xl text-black">スキルカード</p>
      <div className="flex w-9/12 justify-center flex-wrap content-between pl-3 m-4">
        <SkillSheet skill={skill} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'skill' });
  return {
    props: {
      skill: data.contents,
    },
  };
};
