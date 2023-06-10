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
      <div className="w-full flex flex-col m-6 justify-center items-center md:mt-6">
        <div className="mb-16 w-[360px] md:w-[768px]">
          <ProfileCard />
        </div>
        <div className="w-[360px] md:w-[768px] m-6">
          <Experience experience={props.experience} />
        </div>
        {/* <div className="w-[360px] md:w-[768px] m-6">
          <div className="w-full flex flex-col justify-center items-center bg-white rounded-xl shadow-xl p-8">
            <p className="text-3xl mb-8 font-bold">Education</p>
            <ul className="w-full flex flex-col items-start justify-between md:ml-4 xs:ml-2">
              <li className="text-lg">{"2023年卒業: 慶應義塾大学商学部"}</li>
              <li className="text-lg">{"2017年卒業: 都立大泉高校"}</li>
            </ul>
          </div>
        </div> */}
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
