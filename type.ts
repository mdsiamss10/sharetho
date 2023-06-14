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
    likes: true;
  };
}>;

export type OtherProfileType = Prisma.UserGetPayload<{
  include: {
    tweets: {
      include: {
        likes: true;
        author: true;
        comments: {
          include: {
            commentAuthor: true;
          };
        };
      };
    };
  };
}>;
