import { GetStaticProps, NextPage } from "next";
import { client } from "../../libs/client";
import { Layout } from "../components/Layout";
import { SkillSheet } from "../components/SkillSheet";
import { SkillType } from "types";

interface Props {
  skill: SkillType[];
}

export const Profile: NextPage<Props> = ({ skill }) => {
  return (
    <Layout pageTitle="profile">
      <>
        <p className="mt-6 text-3xl text-black">スキルカード</p>
        <div className="flex w-10/12 justify-center flex-wrap content-between pl-3 m-4">
          <SkillSheet skill={skill} />
        </div>
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "skill" });
  return {
    props: {
      skill: data.contents,
    },
  };
};

export default Profile;
