import Image from "next/image";
import React from "react";

const CommentBody = ({commentData}) => {
   return (
      <div className="flex gap-3 mt-8  pb-2 w-[100%]">

         <Image
            src="/assets/user.png"
            alt="user"
            height={30}
            width={30}
            className="w-[3rem] h-[3rem] rounded-full bg-gray-200 p-2"
         />
         <div className="border-b-[1px] border-b-gray-400 pb-2 w-[100%]">
            <span className="text-gray-50">
               {commentData.author} <span>--- ({new Date(commentData.created_at).toDateString()})</span>{" "}
            </span>
            <p className="text-gray-400">
               {commentData?.text}
            </p>
         </div>
      </div>
   );
};

export default CommentBody;
