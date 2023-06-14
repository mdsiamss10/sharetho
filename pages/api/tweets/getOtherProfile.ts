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
    const { id } = req.body;
    const tweets = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tweets: {
          include: {
            likes: true,
            author: true,
            comments: {
              include: {
                commentAuthor: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(tweets);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
