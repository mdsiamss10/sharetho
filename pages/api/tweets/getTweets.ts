import { prisma } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        comments: {
          include: {
            commentAuthor: true,
          },
        },
      },
    });
    return res.status(200).json(tweets);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
