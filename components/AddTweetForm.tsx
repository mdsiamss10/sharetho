import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import AddTweetTextArea from "./AddTweetTextArea";

async function AddTweetForm() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex gap-5 items-start p-3">
      <Image
        className="w-11 h-11 rounded-full select-none cursor-pointer"
        src={session?.user?.image ?? ""}
        alt="Image"
        width={1000}
        height={1000}
        referrerPolicy="no-referrer"
      />
      <AddTweetTextArea />
    </div>
  );
}

export default AddTweetForm;
