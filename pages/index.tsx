import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

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
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: ITEM }>(
    {}
  );
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const getAwardsData = async () => {
      const response = await fetch("http://localhost:3000/api/ballots");
      const awards = await response.json();
      setData(awards.items);
      console.log(awards.items);
    };
    console.log(selectedItems);

    getAwardsData();
  }, [selectedItems]);

  const handleSelect = (categoryId: string, selectedItem: ITEM) => {
    setSelectedItems((prevSelected) => {
      const updatedSelectedItems = { ...prevSelected };

      delete updatedSelectedItems[categoryId];

      updatedSelectedItems[categoryId] = selectedItem;
      return updatedSelectedItems;
    });
  };

  const isSelected = (categoryId: string, itemId: ITEM) => {
    // console.log(selectedItems[categoryId].id,itemId.id);

    return selectedItems[categoryId]?.id === itemId.id;
  };

  return (
    <div>
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <Modal isOpen={isOpen} closeModal={closeModal} />
        <div className="mt-24 mb-20 space-y-20 mx-8 lg:mx-40">
          {data.map((it: CATITEM) => (
            <div key={it.id} className="space-y-10">
              <h1 className="text-4xl border-b-4 w-fit border-[#009B86] text-white">
                {it.title}
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-16 gap-x-20">
                {it.items.map((item: ITEM) => (
                  <div
                    key={item.id}
                    className={`flex flex-col items-center  rounded-2xl w-fit gap-y-8 py-10 px-10 border shadow-md ${
                      isSelected(it.id, item) ? "bg-[#009B86]" : ""
                    }`}
                  >
                    <h1
                      className={`${
                        isSelected(it.id, item) ? "bg-[#009B86]" : ""
                      } text-2xl font-medium text-white`}
                    >
                      {item.title}
                    </h1>
                    <Image
                      src={item.photoUrL}
                      width={350}
                      height={350}
                      className={`"object-contain w-full ${
                        isSelected(it.id, item) ? "bg-[#009B86]" : ""
                      }`}
                    />
                    <div
                      className={`${
                        isSelected(it.id, item)
                          ? "bg-[#009B86] w-full px-10"
                          : "w-full px-10"
                      }`}
                    >
                      <button
                        onClick={() => handleSelect(it.id, item)}
                        className="p-4 bg-[#34AC9C] rounded-2xl w-full text-lg text-white hover:text-[#CCCCCC] transition-all ease-in-out duration-200"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-end items-center">
            <button
              onClick={openModal}
              className="p-4 mt-10 bg-[#34AC9C] rounded-2xl max-w-[20rem] w-full text-lg text-white hover:text-[#CCCCCC] transition-all ease-in-out duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
