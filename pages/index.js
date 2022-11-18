import React, { useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import { searchAPI } from "./api/search";

const Home = () => {

   return (
      <div>
         <Header />
         <Search />
      </div>
   );
};

export default Home;
