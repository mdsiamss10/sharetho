import formatTwitterTime from "@/libs/formatTime";
import { TweetType } from "@/type";
import Image from "next/image";
import BlueTick from "./BlueTick";
import SmallDot from "./SmallDot";

function TweetCard({
  tweet,
  author,
  comments,
  likedArray,
  createdAt,
}: TweetType) {
  if (author.email == "ohiduzzamansiam@gmail.com") {
    author.isVerified = true;
  }
  return (
    <>
      <div className="border-b border-gray-600 p-4">
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
              <h1
                className={`font-medium cursor-pointer hover:underline select-none ${
                  !author.isVerified && "mr-1"
                }`}
              >
                {author?.name}
              </h1>
              {author.isVerified && (
                <span className="mx-1">
                  <BlueTick />
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <h2 className="text-sm text-white/60 cursor-pointer hover:underline select-none">
                @{author?.name?.trim().split(" ").join("").toLowerCase()}
              </h2>
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
      </div>
    </>
  );
}

export default TweetCard;
