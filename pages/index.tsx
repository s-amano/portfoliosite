import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { Layout } from "../components/Layout";
import { ProfileCard } from "../components/ProfileCard";

export const Home: NextPage = () => {
  return (
    <Layout pageTitle="home">
      <div className="w-full flex flex-col justify-center items-center">
        <ProfileCard />
      </div>
    </Layout>
  );
};

export default Home;
