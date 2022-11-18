import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Search from "../components/Search";
import { searchAPI } from "./api/search";

const Home = () => {
   return (
      <Layout>
         <Head>
            <title>Hack.News</title>
         </Head>
         <Search />
      </Layout>
   );
};

export default Home;
