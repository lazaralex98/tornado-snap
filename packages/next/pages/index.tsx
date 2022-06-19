import type { NextPage } from "next";
import Head from "next/head";
import Form from "../components/Form";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { fetchData } from "../utils";

const navigation = [{ name: "Home", href: "#", current: true }];

const Home: NextPage = () => {
  const [snapConnected, setSnapConnected] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [storedNote, setStoredNote] = useState<string>("");

  const getStoredNote = async (ethereum: any) => {
    const storedNote = (await fetchData(ethereum)).tornadoNote;
    setStoredNote(storedNote);
  };

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window;
    getStoredNote(ethereum);
  }, []);

  return (
    <div>
      <Head>
        <title>Tornado Cash Note Storage</title>
        <meta
          name="description"
          content="Store your tornado note in MetaMask"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <div className="min-h-full">
          <div className="bg-gray-800 pb-32">
            <Nav
              navigation={navigation}
              snapConnected={snapConnected}
              setSnapConnected={setSnapConnected}
            />
            <header className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              </div>
            </header>
          </div>

          <main className="-mt-32">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                <Form
                  note={note}
                  storedNote={storedNote}
                  setNote={setNote}
                  setStoredNote={setStoredNote}
                />
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </>
    </div>
  );
};

export default Home;
