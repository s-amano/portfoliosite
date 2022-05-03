import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { Layout } from "../components/Layout";
import { ProfileCard } from "../components/ProfileCard";
import { SkillType } from "types";
import { SkillSheet } from "components/SkillSheet";

interface Props {
  skill: SkillType[];
}

export const Home: NextPage<Props> = (props: Props) => {
  const { skill } = props;
  return (
    <Layout pageTitle="home">
      <div className="w-full flex flex-col justify-center items-center md:mt-6">
        <ProfileCard />

        <div className="flex w-10/12 xl:w-7/12 justify-center flex-wrap content-between pl-3 mt-8">
          <SkillSheet skill={skill} />
        </div>
      </div>
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

export default Home;
