"use client";

import { OtherProfileType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import TweetCard from "../TweetCard";

function OtherProfile({ id }: { id: string }) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<OtherProfileType>({
    queryKey: ["getOtherProfile"],
    queryFn: async () => {
      const res = await axios.post("/api/tweets/getOtherProfile", { id });
      return await res.data;
    },
  });
  return (
    <>
      <div>
        {isLoading && (
          <div className="text-center mt-5">
            <span className="loading loading-spinner  text-gray-600 loading-lg" />
          </div>
        )}
        {/* Profile Image and details */}
        {!isLoading && (
          <div className="flex flex-col items-center py-4 gap-3">
            <Image
              className="w-32 h-32 rounded-full select-none cursor-pointer"
              src={user?.image ?? ""}
              alt="Image"
              width={1000}
              height={1000}
              referrerPolicy="no-referrer"
            />
            <div className="text-center">
              <h1 className="text-2xl font-medium">{user?.name}</h1>
              <h2 className="text-sm text-white/60 cursor-pointer hover:underline select-none">
                {`@${user?.name?.trim().split(" ").join("").toLowerCase()}`}
              </h2>
            </div>
          </div>
        )}
        {/* Tweets */}
        <h1 className="text-center text-gray-600 text-xl font-medium mt-5">
          {isError && "Error while loading tweets"}
          {user?.tweets?.length == 0 && "No tweets available."}
        </h1>
        {user?.tweets?.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </div>
    </>
  );
}

export default OtherProfile;
