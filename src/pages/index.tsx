import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { Layout } from "../components/Layout";
import { ProfileCard } from "../components/ProfileCard";
import { ExperienceType } from "types";
import { Experience } from "@/components/Experience";

interface Props {
  experience: ExperienceType[];
}

export const Home: NextPage<Props> = (props: Props) => {
  return (
    <Layout pageTitle="home">
      <div className="w-full flex flex-col justify-center items-center md:mt-6">
        <div className="mb-16 w-[360px] md:w-[768px]">
          <ProfileCard />
        </div>
        <div className="w-[360px] md:w-[768px]">
          <Experience experience={props.experience} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "experience" });
  return {
    props: {
      experience: data.contents,
    },
  };
};

export default Home;
