"use client";

import { TweetType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TweetCard from "./TweetCard";

function AuthTweets() {
  const {
    data: tweets,
    isLoading,
    isError,
  } = useQuery<TweetType[]>({
    queryKey: ["getAuthTweets"],
    queryFn: async () => {
      const res = await axios.get("/api/tweets/getAuthTweets");
      return await res.data;
    },
  });
  return (
    <div>
      {isLoading && (
        <div className="text-center mt-5">
          <span className="loading loading-spinner  text-gray-600 loading-lg" />
        </div>
      )}
      <h1 className="text-center text-gray-600 text-xl font-medium mt-5">
        {isError && "Error while loading tweets"}
        {tweets?.length == 0 && "No tweets available."}
      </h1>
      {tweets?.map((tweet) => (
        <>
          <TweetCard key={tweet.id} {...tweet} />
        </>
      ))}
    </div>
  );
}

export default AuthTweets;
