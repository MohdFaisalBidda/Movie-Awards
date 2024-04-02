import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { useEffect, useState } from "react";

interface ITEM {
  title: string;
  photoUrL: string;
  id: string;
}

interface CATITEM extends ITEM {
  items: ITEM;
}

const Home: NextPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAwardsData = async () => {
      const response = await fetch("http://localhost:3000/api/ballots");
      const awards = await response.json();
      setData(awards.items);
      console.log(awards.items);
    };
    getAwardsData();
  }, []);

  return (
    <div>
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <div className="my-24 space-y-20 mx-40">
          {data.map((it: CATITEM) => (
            <div key={it.id} className="space-y-10">
              <h1 className="text-4xl border-b-4 w-fit border-[#009B86] text-white">
                {it.title}
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-16 gap-x-20">
                {it.items.map((item: ITEM) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center bg-[#009B86] rounded-2xl w-fit gap-y-8 py-10 px-10 border shadow-md"
                  >
                    <h1 className="text-2xl font-medium text-white bg-[#009B86]">
                      {item.title}
                    </h1>
                    <Image
                      src={item.photoUrL}
                      width={350}
                      height={350}
                      className="object-contain w-full bg-[#009B86]"
                    />
                    <div className="w-full px-10 bg-[#009B86]">
                      <button className="p-4 bg-[#34AC9C] rounded-2xl w-full text-lg text-white hover:text-[#CCCCCC] transition-all ease-in-out duration-200">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;