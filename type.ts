import { Prisma } from "@prisma/client";

export type TweetType = Prisma.TweetGetPayload<{
  orderBy: {
    createdAt: "desc";
  };
  include: {
    author: true;
    comments: {
      include: {
        commentAuthor: true;
      };
    };
  };
}>;
