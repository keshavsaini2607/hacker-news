import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
   const router = useRouter();
   return (
      <header className="p-4">
         <span
            className="text-2xl text-red-600 font-bold cursor-pointer"
            onClick={() => router.replace("/")}
         >
            Hack. <span className="text-white">News</span>
         </span>
      </header>
   );
};

export default Header;
