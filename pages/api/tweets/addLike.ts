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
    const { id, isLiked } = req.body;
    if (!isLiked) {
      await prisma.tweet.update({
        where: {
          id,
        },
        data: {
          likes: {
            create: { likedUserEmail: session.user?.email! },
          },
        },
      });
    } else {
      await prisma.tweet.update({
        where: {
          id,
        },
        data: {
          likes: {
            deleteMany: {
              likedUserEmail: session.user?.email!,
            },
          },
        },
      });
    }
    return res.status(200).json({ message: "Tweet toggled successfully" });
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
}
