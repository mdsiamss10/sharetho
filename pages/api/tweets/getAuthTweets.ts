import { prisma } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Invalid session" });
    const tweets = await prisma.tweet.findMany({
      where: {
        author: {
          email: session?.user?.email,
        },
      },
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
        likes: true,
      },
    });
    return res.status(200).json(tweets);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
