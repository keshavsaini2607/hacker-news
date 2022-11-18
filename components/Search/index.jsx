import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { searchAPI } from "../../pages/api/search";
import { BiLinkExternal } from "react-icons/bi";
import { useRouter } from "next/router";

const Search = () => {
    const router = useRouter();
   const queryRef = useRef();
   const [searchResults, setSearchResults] = useState([]);

   const search = async (query) => {
      try {
         const resp = await searchAPI(query);
         setSearchResults([...resp]);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      let attached = true;

      if (attached && queryRef.current.value == "") {
        console.log(queryRef.current.value)
         setSearchResults([]);
      }

      return () => {
         attached = false;
      };
   }, [queryRef?.current?.value]);

   return (
      <div>
         <span className="flex flex-col w-[60%] mx-auto">
            <label className="text-white font-bold mb-1">Hack News</label>
            <input
               placeholder="Search hack news overs here..."
               className="px-4 py-6 rounded-md w-[100%] outline-none border-2 focus:border-red-600 text-lg"
               name="query"
               onChange={(e) => search(e.target.value)}
               ref={queryRef}
            />
         </span>
         <div className="grid grid-cols-2 gap-4 mx-auto items-center mt-10 w-[80%]">
            {searchResults.map((news) => (
               <div
                  className="border-2 border-red-600 rounded-md min-w-[45%] overflow-hidden flex cursor-pointer"
                  key={news.objectID}
                  data-aos="zoom-in"
                  onClick={() => router.push(`/post/${news.objectID}`)}
               >
                  <Image
                     src="/assets/hacker.jpeg"
                     alt="hack"
                     width={100}
                     height={80}
                     className="w-[30%]"
                  />
                  <div className="flex flex-col p-4 w-[100%]">
                     <span className="flex flex-col">
                        <h1 className="text-gray-50 text-2xl truncate w-[70%]">
                           {news.title}
                        </h1>
                        <p className="text-gray-200">By--{news?.author}</p>
                     </span>
                     <a
                        target="_blank"
                        href={news?.url || "/ "}
                        rel="noopener noreferrer"
                        className="mt-2 w-max"
                     >
                        <span className="flex items-center gap-2 text-blue-500 cursor-pointer">
                           Explore More <BiLinkExternal />
                        </span>
                     </a>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Search;
