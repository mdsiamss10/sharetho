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
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });
    const { tweet } = req.body;
    await prisma.tweet.create({
      data: {
        tweet,
        authorId: prismaUser?.id!,
      },
    });
    return res.status(200).json({ message: "Tweet created successfully" });
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
}
