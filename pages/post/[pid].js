import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { searchById } from "../api/search";
import { BiLinkExternal } from "react-icons/bi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CommentBody from "../../components/CommentBody";
import Head from "next/head";

const Post = () => {
   const router = useRouter();
   const { pid } = router.query;
   const [loading, setLoading] = useState(false);
   const [post, setPost] = useState(null);
   const [error, setError] = useState(false);

   const fetchPost = useCallback(async () => {
      try {
         setLoading(true);
         const response = await searchById(pid);
         setPost(response);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
         setError(true);
      }
   }, [pid]);

   useEffect(() => {
      let attached = true;
      if (attached && pid) {
         fetchPost();
      }

      return () => {
         attached = false;
      };
   }, [pid, fetchPost]);

   if (loading) {
      return (
         <Layout>
            <Head>
               <title>Loading...</title>
            </Head>
            <div className="w-[70vw] h-[30vh] mx-auto flex justify-between">
               <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <p>
                     <Skeleton height={200} width={200} />
                  </p>
               </SkeletonTheme>
               <div className="flex items-end flex-col">
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                     <p>
                        <Skeleton height={30} width={500} />
                     </p>
                  </SkeletonTheme>
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                     <p>
                        <Skeleton height={30} width={500} />
                     </p>
                  </SkeletonTheme>
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                     <p>
                        <Skeleton height={30} width={300} />
                     </p>
                  </SkeletonTheme>
               </div>
            </div>
         </Layout>
      );
   }

   if (!loading && !post) {
      return (
         <Layout>
            <Head>
               <title>Error</title>
            </Head>
            <div className="w-[70%] mx-auto flex flex-col gap-4 items-center">
               <span className="text-8xl italic font-semibold text-red-600">
                  404
               </span>
               <h1 className="text-gray-50 text-2xl">
                  Something went wrong please try again!
               </h1>
               <button
                  className="bg-red-600 text-white px-6 py-2 rounded-md"
                  onClick={fetchPost}
               >
                  Try Again
               </button>
               <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => router.replace("/")}
               >
                  Or Redirect To Home
               </span>
            </div>
         </Layout>
      );
   }

   return (
      <Layout>
         <Head>
            <title>{post?.title}</title>
         </Head>
         <div className="w-[70%] mx-auto h-screen">
            <div className="w-[100%] h-[30%] flex justify-between">
               <Image
                  src="/assets/hacker.jpeg"
                  alt="hacker"
                  width={150}
                  height={150}
                  className="w-[20%] h-auto"
               />
               <div className="flex flex-col items-end">
                  <span className="text-3xl text-gray-50 text-end">
                     {post?.title}
                  </span>
                  <span className="text-gray-200">Author: {post?.author}</span>
                  <span className="text-red-600">Points: {post?.points}</span>
                  <a href={post?.url} target="_blank" rel="noreferrer">
                     <span className="text-blue-600 mt-5 flex items-center gap-2 cursor-pointer">
                        Read Full Article <BiLinkExternal />
                     </span>
                  </a>
               </div>
            </div>
            <div className="mt-10">
               <span className="text-3xl text-gray-50">
                  Comments({post?.children?.length})
               </span>
               <div className="mt-10">
                  {post?.children?.map((comment) => (
                     <>
                        {comment?.author && (
                           <CommentBody
                              key={comment?.id}
                              commentData={comment}
                           />
                        )}
                     </>
                  ))}
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Post;
