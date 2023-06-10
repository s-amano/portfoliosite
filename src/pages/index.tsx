import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { Layout } from "../components/Layout";
import { ProfileCard } from "../components/ProfileCard";
import { SkillType } from "types";

interface Props {
  skill: SkillType[];
}

export const Home: NextPage<Props> = (props: Props) => {
  const { skill } = props;
  return (
    <Layout pageTitle="home">
      <div className="w-full flex flex-col justify-center items-center md:mt-6">
        <ProfileCard />
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
