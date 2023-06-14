import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function Details() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-medium">{session?.user?.name}</h1>
        <h2 className="text-sm text-white/60 cursor-pointer hover:underline select-none">
          @{session?.user?.name?.trim().split(" ").join("").toLowerCase()}
        </h2>
      </div>
    </>
  );
}

export default Details;
