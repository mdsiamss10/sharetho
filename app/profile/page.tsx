import AuthTweets from "@/components/AuthTweets";
import Details from "@/components/profile/Details";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  return (
    <>
      <div>
        {/* Profile Image and details */}
        <div className="flex flex-col items-center py-4 gap-3">
          <Image
            className="w-32 h-32 rounded-full select-none cursor-pointer"
            src={session?.user?.image ?? ""}
            alt="Image"
            width={1000}
            height={1000}
            referrerPolicy="no-referrer"
          />
          <Details />
        </div>
        <AuthTweets />
      </div>
    </>
  );
}

export default ProfilePage;
