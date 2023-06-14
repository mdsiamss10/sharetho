"use client";

import formatTwitterTime from "@/libs/formatTime";
import { OtherProfileType, TweetType } from "@/type";
import { Like } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import BlueTick from "./BlueTick";
import SmallDot from "./SmallDot";

function TweetCard({
  tweet,
  author,
  comments,
  createdAt,
  likes,
  id,
}: TweetType) {
  if (author.email == "ohiduzzamansiam@gmail.com") {
    author.isVerified = true;
  }
  const { data } = useSession();
  let isLiked = likes.some(
    (like: Like) => like.likedUserEmail === data?.user?.email
  );

  const queryClient = useQueryClient();

  const pathname = usePathname();

  const { mutate: likeMutate } = useMutation(
    async (id: string) => {
      await axios.post("/api/tweets/addLike", { id, isLiked });
    },
    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries(["getTweets"]);

        const previousTweets = queryClient.getQueryData<TweetType[]>([
          "getTweets",
        ]);

        const newLikeTweet: Like = {
          id,
          likedUserEmail: data?.user?.email!,
          tweetId: id,
        };

        const updatedLikes = [...likes];

        const isLiked = likes.some((like: Like, index: number) => {
          if (like.likedUserEmail === data?.user?.email) {
            // Remove the like from the local state
            updatedLikes.splice(index, 1);
            return true;
          }
          return false;
        });

        if (!isLiked) {
          // Add the new like to the local state
          updatedLikes.push(newLikeTweet);
        }

        // Update the query data for "getTweets"
        queryClient.setQueryData(
          ["getTweets"],
          (old: TweetType[] | undefined) => {
            if (!old || !Array.isArray(old)) {
              return [];
            }

            return old.map((tweet: TweetType) => {
              if (tweet.id === id) {
                return { ...tweet, likes: updatedLikes };
              }
              return tweet;
            });
          }
        );

        // Update the query data for "getAuthTweets"
        queryClient.setQueryData(
          ["getAuthTweets"],
          (old: OtherProfileType[] | undefined) => {
            if (!old || !Array.isArray(old)) {
              return [];
            }

            return old.map((tweet: OtherProfileType) => {
              if (tweet.id === id) {
                return { ...tweet, likes: updatedLikes };
              }
              return tweet;
            });
          }
        );

        return { previousTweets, updatedLikes };
      },

      onError: (error, variables, context) => {
        // Restore the previous tweets data in case of an error
        queryClient.setQueryData(["getTweets"], context?.previousTweets);
        queryClient.setQueryData(["getAuthTweets"], context?.previousTweets);
      },
      onSettled: () => {
        // Invalidate the queries to trigger a refetch
        queryClient.invalidateQueries(["getTweets", "getAuthTweets"]);
      },
    }
  );

  const { mutate: deleteMutate } = useMutation(
    async (id: string) => {
      await axios.post("/api/tweets/deleteTweet", { id });
    },
    {
      onSuccess: () => {
        toast.success("Tweet deleted.");
        queryClient.invalidateQueries(["getAuthTweets"]);
      },
    }
  );

  const handleLike = () => {
    likeMutate(id);
  };

  const handleDelete = () => {
    deleteMutate(id);
  };

  return (
    <>
      <div className="border-t border-gray-600 p-4 pb-2">
        {/* Profile div */}
        <div className="flex gap-2 md:gap-3">
          {/* Details Section */}
          <Image
            className="w-11 h-11 rounded-full select-none cursor-pointer"
            src={author?.image ?? ""}
            alt="Image"
            width={1000}
            height={1000}
            referrerPolicy="no-referrer"
          />
          <div>
            {/* Profile name */}
            <div className="flex items-center">
              <h1 className={`font-medium ${!author.isVerified && "mr-1"}`}>
                {author?.name}
              </h1>
              {author.isVerified && (
                <span className="mx-1">
                  <BlueTick />
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-sm text-white/60 cursor-pointer hover:underline select-none">
                @{author?.name?.trim().split(" ").join("").toLowerCase()}
              </h1>
              <SmallDot />
              <h2 className={`text-sm text-white/60`}>
                {formatTwitterTime(createdAt)}
              </h2>
            </div>
          </div>
        </div>
        {/* Post div */}
        <div className="mt-2.5">
          <span className="whitespace-pre-wrap text-white/95">{tweet}</span>
        </div>
        {/* Bottom Buttons */}
        <div className="text-gray-500 flex items-center gap-3 mt-2 text-sm">
          <span
            onClick={handleLike}
            className="flex items-center gap-1 cursor-pointer select-none"
          >
            {isLiked ? (
              <AiFillHeart className="text-red-500" />
            ) : (
              <AiOutlineHeart />
            )}
            {likes.length}
          </span>

          <span className="flex items-center gap-1 cursor-pointer select-none">
            <AiOutlineComment />
            {comments.length}
          </span>

          {pathname == "/profile" && (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this tweet?")) {
                  handleDelete();
                }
              }}
              className="text-red-500 cursor-pointer select-none"
            >
              <MdDeleteOutline />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default TweetCard;
